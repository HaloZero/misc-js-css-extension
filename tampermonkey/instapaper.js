// ==UserScript==
// @name         Instapaper
// @namespace    instapaper
// @version      0.2
// @description  try to take over the world!
// @author       You
// @match        *://*.instapaper.com/*
// @grant        none
// ==/UserScript==

function replaceLinks() {
	var articles = document.querySelectorAll("#article_list .article_item")
	for (var i = 0; i < articles.length; i++) {
		var article = articles[i]
		var sourceURL = article.querySelector(".js_bookmark_edit").dataset['url'];
		article.querySelector('a.article_title').setAttribute('href', sourceURL)
	}
}

setTimeout(replaceLinks, 1000)
