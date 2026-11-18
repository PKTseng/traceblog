const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { test } = require('node:test');

function loadTheme({ stored = null, dark = false, blocked = false } = {}) {
    const root = {
        attributes: {},
        setAttribute(name, value) { this.attributes[name] = value; },
        getAttribute(name) { return this.attributes[name]; }
    };
    const button = {
        attributes: {}, hidden: true,
        setAttribute(name, value) { this.attributes[name] = value; },
        addEventListener(type, listener) { this[type] = listener; }
    };
    const document = {
        documentElement: root,
        getElementById(id) { return id === 'theme-toggle' ? button : null; },
        addEventListener(type, listener) { this[type] = listener; }
    };
    const media = {
        matches: dark,
        addEventListener(type, listener) { this[type] = listener; }
    };
    const storage = new Map(stored === null ? [] : [['traceblog-theme', stored]]);
    const window = {
        matchMedia() { return media; },
        localStorage: {
            getItem(key) { if (blocked) throw new Error('Storage blocked'); return storage.get(key) || null; },
            setItem(key, value) { if (blocked) throw new Error('Storage blocked'); storage.set(key, value); }
        }
    };
    const filename = path.join(__dirname, '../themes/hexo-theme-minos-master/source/js/theme.js');
    vm.runInNewContext(fs.readFileSync(filename, 'utf8'), { window, document });
    return { root, button, document, media, storage };
}

test('applies system preference before DOM content is ready', () => {
    for (const [dark, expected] of [[true, 'dark'], [false, 'light']]) {
        const page = loadTheme({ dark });
        assert.equal(page.root.attributes['data-theme'], expected);
    }
});

test('saved preference overrides the system, including on a later page', () => {
    for (const [stored, dark] of [['light', true], ['dark', false]]) {
        const page = loadTheme({ stored, dark });
        assert.equal(page.root.attributes['data-theme'], stored);
    }
});

test('invalid saved value falls back to the system preference', () => {
    assert.equal(loadTheme({ stored: 'invalid', dark: true }).root.attributes['data-theme'], 'dark');
});

test('toggle changes the rendered theme and persists the choice', () => {
    const page = loadTheme();
    page.document.DOMContentLoaded();
    assert.equal(page.button.hidden, false);
    assert.equal(page.button.attributes['aria-pressed'], 'false');
    page.button.click();
    assert.equal(page.root.attributes['data-theme'], 'dark');
    assert.equal(page.storage.get('traceblog-theme'), 'dark');
    assert.equal(page.button.attributes['aria-pressed'], 'true');
    assert.equal(loadTheme({ stored: page.storage.get('traceblog-theme') }).root.attributes['data-theme'], 'dark');
    page.button.click();
    assert.equal(page.root.attributes['data-theme'], 'light');
    assert.equal(page.storage.get('traceblog-theme'), 'light');
});

test('follows system changes only until the user makes a choice', () => {
    const page = loadTheme();
    page.document.DOMContentLoaded();
    page.media.matches = true;
    page.media.change();
    assert.equal(page.root.attributes['data-theme'], 'dark');
    page.button.click();
    page.media.change();
    assert.equal(page.root.attributes['data-theme'], 'light');
});

test('blocked storage still allows rendering and toggling', () => {
    const page = loadTheme({ blocked: true, dark: true });
    assert.equal(page.root.attributes['data-theme'], 'dark');
    page.document.DOMContentLoaded();
    page.button.click();
    assert.equal(page.root.attributes['data-theme'], 'light');
});
