// ==UserScript==
// @name         Facebook Tweaker
// @namespace    http://www.facebook.com
// @version      0.1
// @description  Small fixes to Facebook
// @author       You
// @match        https://www.facebook.com/*
// @grant        none
// ==/UserScript==

function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}

(function() {
    'use strict';

    // remove video tab
    document.querySelector('[aria-label="Watch"]').closest("li").remove()

    // add "Most Recent"
    addMostRecent()
    setInterval(addMostRecentFollowUp, 500)
})();

function addMostRecent() {
    var watchOption = document.querySelector('[href="https://www.facebook.com/watch/"]').closest("li")
    watchOption.querySelector('[href="https://www.facebook.com/watch/"]').setAttribute("href", "https://www.facebook.com/?sk=h_chr")
    watchOption.querySelectorAll("span")[1].textContent = "Most Recent"
    watchOption.addEventListener("click", function (event) { event.stopPropagation() });
}

function addMostRecentFollowUp() {
    var watchOption = document.querySelector('[href="https://www.facebook.com/?sk=h_chr"]').closest("li")
    watchOption.querySelectorAll("span")[1].textContent = "Most Recent"
    watchOption.addEventListener("click", function (event) { event.stopPropagation() });
}

function addMostRecentAddNewNode() {
    var friendOption = document.querySelector('[href="https://www.facebook.com/friends/"]').closest("li")
    var mostRecentOption = friendOption.cloneNode(true);
    mostRecentOption.querySelector('[href="https://www.facebook.com/friends/"]').setAttribute("href", "https://www.facebook.com/?sk=h_chr")
    mostRecentOption.querySelectorAll("span")[1].textContent = "Most Recent"
    if (document.querySelector('[href="https://www.facebook.com/?sk=h_chr"]') == null) {
       insertAfter(mostRecentOption, friendOption)
    }
}
