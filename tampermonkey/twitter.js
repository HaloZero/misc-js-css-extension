// ==UserScript==
// @name         Twitter
// @namespace    Twitter
// @version      0.2
// @description  try to take over the world!
// @author       You
// @match        *://*.twitter.com/*
// @grant        none
// @require http://code.jquery.com/jquery-3.4.1.min.js
// ==/UserScript==

$(function() {
    'use strict';
    console.log("Twitter!")
    setInterval(hideWhoToFollow, 1000);
});

// Hides the "Who to follow section" on Twitter
function hideWhoToFollow() {
    $("aside[aria-label='Who to follow']").parent().hide();
};