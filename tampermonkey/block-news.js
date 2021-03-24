// ==UserScript==
// @name         Block sites (News)
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  Block sites (such as Baidu, etc.) You can edit the block list in the script.
// @author       Blah
// @match        https://www.sfgate.com/*
// @match        https://www.foxnews.com/*
// @match        https://www.reddit.com/r/Conservative/*
// @match        https://www.fivethirtyeight.com/*
// @match        https://finance.google.com/*
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
    setInterval(hideBody, 200);
});