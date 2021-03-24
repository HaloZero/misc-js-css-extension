// ==UserScript==
// @name         Block sites (Mine)
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  Block sites (such as Baidu, etc.) You can edit the block list in the script.
// @author       Blah
// @match        https://www.doordash.com/*
// @match        https://www.grubhub.com/*
// @match        https://www.teamblind.com/*
// @require      https://code.jquery.com/jquery-3.5.1.slim.min.js
// ==/UserScript==

$(function() {
    'use strict';
    window.stop();

    function hideBody() {
        console.log("HIDING BODY");
        document.body = document.createElement("body");
        document.body.innerHTML = "";
    }

    hideBody();
    console.log("setup")
    setInterval(hideBody, 1000);
});