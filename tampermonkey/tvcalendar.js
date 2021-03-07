// ==UserScript==
// @name         TVCalendar
// @namespace    TVCalendar
// @version      0.2
// @description  try to take over the world!
// @author       You
// @match        *://*.pogdesign.co.uk/*
// @grant        none
// @require      http://code.jquery.com/jquery-3.4.1.min.js
// ==/UserScript==

$(function() {
  var shows = document.querySelectorAll(".checked strong");
  var elements = []
  for (var i = 0; i < shows.length; i++) {
    var show = shows[i]
    var name = show.textContent.replace("View Show Summary", "");
    var span = document.createElement("div");
    span.textContent = name;
    elements.push(span)
  }

  var container = document.createElement("div");
  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    container.appendChild(element);
  }
  document.querySelector(".contbox").prepend(container);
});