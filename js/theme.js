(function () {
    'use strict';

    var root = document.documentElement;
    var system = window.matchMedia('(prefers-color-scheme: dark)');
    var preference = null;
    var button;

    try {
        var stored = window.localStorage.getItem('traceblog-theme');
        if (stored === 'light' || stored === 'dark') preference = stored;
    } catch (error) {
        // Browsing restrictions may make storage unavailable.
    }

    function applyTheme(theme) {
        root.setAttribute('data-theme', theme);
        if (button) {
            button.setAttribute('aria-pressed', String(theme === 'dark'));
            button.title = theme === 'dark' ? '切換至亮色模式' : '切換至暗色模式';
        }
    }

    // Run in the head, before styles are painted, including on subsequent pages.
    applyTheme(preference || (system.matches ? 'dark' : 'light'));

    system.addEventListener('change', function () {
        if (!preference) applyTheme(system.matches ? 'dark' : 'light');
    });

    document.addEventListener('DOMContentLoaded', function () {
        button = document.getElementById('theme-toggle');
        if (!button) return;
        applyTheme(preference || (system.matches ? 'dark' : 'light'));
        button.hidden = false;
        button.addEventListener('click', function () {
            preference = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            applyTheme(preference);
            try {
                window.localStorage.setItem('traceblog-theme', preference);
            } catch (error) {
                // Keep the switch functional even when persistence is blocked.
            }
        });
    });
})();
