(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.config = factory());
})(this, (function () { 'use strict';

  const configQueryMap = {
    "navbar-vertical-collapsed": "phoenixIsNavbarVerticalCollapsed",
    "color-scheme": "phoenixTheme",
    "navigation-type": "phoenixNavbarPosition",
    "vertical-navbar-appearance": "phoenixNavbarVerticalStyle",
    "horizontal-navbar-shape": "phoenixNavbarTopShape",
    "horizontal-navbar-appearance": "phoenixNavbarTopStyle"
  };

  const initialConfig = {
    phoenixIsNavbarVerticalCollapsed: false,
    phoenixTheme: "light",  // Default theme is light
    phoenixNavbarTopStyle: "default",
    phoenixNavbarVerticalStyle: "default",
    phoenixNavbarPosition: "vertical",
    phoenixNavbarTopShape: "default",
    phoenixIsRTL: false,
    phoenixSupportChat: true
  };

  const CONFIG = { ...initialConfig };

  const setConfig = (e, a = true) => {
    Object.keys(e).forEach((t) => {
      CONFIG[t] = e[t];
      a && localStorage.setItem(t, e[t]);
    });
  };

  const resetConfig = () => {
    Object.keys(initialConfig).forEach((e) => {
      CONFIG[e] = initialConfig[e];
      localStorage.setItem(e, initialConfig[e]);
    });
  };

  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  if (Object.keys(params).length > 0 && Object.keys(params).includes("theme-control")) {
    resetConfig();
    Object.keys(params).forEach((e) => {
      if (configQueryMap[e]) localStorage.setItem(configQueryMap[e], params[e]);
    });
  }

  Object.keys(CONFIG).forEach((e) => {
    if (localStorage.getItem(e) === null) {
      localStorage.setItem(e, CONFIG[e]);
    } else {
      try {
        setConfig({ [e]: JSON.parse(localStorage.getItem(e)) });
      } catch {
        setConfig({ [e]: localStorage.getItem(e) });
      }
    }
  });

  // Force Dark Mode by default if not set to light
  if (localStorage.getItem("phoenixTheme") === null || localStorage.getItem("phoenixTheme") === "light") {
    localStorage.setItem("phoenixTheme", "dark");  // Set dark mode as default
  }

  // Apply the theme based on localStorage
  if ("dark" === localStorage.getItem("phoenixTheme")) {
    document.documentElement.setAttribute("data-bs-theme", "dark");
  } else if ("auto" === localStorage.getItem("phoenixTheme")) {
    document.documentElement.setAttribute("data-bs-theme", window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  }

  if (JSON.parse(localStorage.getItem("phoenixIsNavbarVerticalCollapsed"))) {
    document.documentElement.classList.add("navbar-vertical-collapsed");
  }

  if ("horizontal" === localStorage.getItem("phoenixNavbarPosition")) {
    document.documentElement.setAttribute("data-navigation-type", "horizontal");
  }

  if ("combo" === localStorage.getItem("phoenixNavbarPosition")) {
    document.documentElement.setAttribute("data-navigation-type", "combo");
  }

  var config = { config: CONFIG, reset: resetConfig, set: setConfig };

  return config;

}));
