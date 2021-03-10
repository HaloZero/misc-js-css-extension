// ==UserScript==
// @name         Fire Copy
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *://www.sfchronicle.com/projects/california-fire-map/*
// @grant        none
// @require      http://code.jquery.com/jquery-3.4.1.min.js
// ==/UserScript==

$(function() {
    console.log("This is just how things work")
    var label = document.createElement("a")
    label.text = "Copy to clipboard"
    label.id = "copyText"
    label.style = "width: 100px; height: 100px; font-size: 25px; color: green; font-weight: bold; cursor: pointer; margin: 5px;"
    var container = $(".fire-data-wrapper")
    container.prepend(label)
    $("#copyText").click(function () {
        copyText()
    })
})

function copyText() {
    var $pages = $(".fire-page")
    var finalText = ""
    $pages.each(function (index, page) {
        var $page = $(page);
        if ($page.hasClass("inactive")) {
            return;
        }
        var fireName = $page.find("h3 a").text()
        var acreage = $($page.find("p")[1]).text().replace("Acres burned: ","")
        var containment = $($page.find("p")[2]).text().replace("Containment: ","")
        var text = $page.find("h3 a").text() + ": " + acreage + ": " + containment + " \n";
        finalText += text;
    })

    console.log("Copy ", finalText)
    copyTextToClipboard(finalText);
}

function copyTextToClipboard(text) {
  console.log(text)
  var textArea = document.createElement("textarea");
  textArea.style.position = "fixed";
  textArea.style.top = 0;
  textArea.style.left = 0;
  textArea.style.width = "2em";
  textArea.style.height = "2em";
  textArea.style.padding = 0;
  textArea.style.border = "none";
  textArea.style.outline = "none";
  textArea.style.boxShadow = "none";
  textArea.style.background = "transparent";
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();

  try {
    var successful = document.execCommand("copy");
    var msg = successful ? "successful" : "unsuccessful";
    console.log("Copying text command was " + msg);
  } catch (err) {
    console.log("Oops, unable to copy");
  }

  document.body.removeChild(textArea);
}

