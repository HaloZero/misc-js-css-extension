// ==UserScript==
// @name         Instapaper
// @namespace    instapaper
// @version      0.2
// @description  try to take over the world!
// @author       You
// @match        *://*.instapaper.com/*
// @grant        none
// @require http://code.jquery.com/jquery-3.4.1.min.js
// ==/UserScript==

$(function() {
    var $articles = $("#article_list .article_item")
    $articles.each(function () {
        var sourceURL = $(this).find(".js_bookmark_edit").data('url');
        $(this).find("a.article_title").attr('href', sourceURL);
    })
});
