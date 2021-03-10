// ==UserScript==
// @name         Getty images helper
// @namespace
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.gettyimages.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    $(".gallery-mosaic-asset__link").each(function(i, element) {
       var $element = $(element)
       console.log($element)
       var target = $element.attr("target")
       var newLink = $("<div>").text(target)
       $element.parent().parent().append(newLink)
    })
})();