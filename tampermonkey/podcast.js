// ==UserScript==
// @name         Podcast
// @namespace    Podcasting
// @version      0.1
// @description  Podcast script
// @author       You
// @match        *://*.thisamericanlife.org/*
// @match        *://*.gimletmedia.com/*
// @match        *://*.stuffyoushouldknow.com/*
// @match        *://*.99percentinvisible.org/*
// @match        *://*.thisiscriminal.com/*
// @match        *://*.loveandradio.org/*
// @match        *://*.lorepodcast.com/*
// @match        *://*.radiolab.org/*
// @match        *://*.imaginaryworldspodcast.org/*
// @match        *://*.wnycstudios.org/*
// @match        *://*.iheart.com/*
// @match        *://*.kqed.org/podcasts/*
// @match        *://*.eastbayyesterday.com/*
// @require      http://code.jquery.com/jquery-latest.js

// ==/UserScript==

$(onLoad);

var configurations = []

function onLoad() {
  createConfigurations()
  checkConfigs()
}

function checkConfigs() {
  var domain = window.location.hostname
  console.log("checking configurations");
  for (index in configurations) {
    var configuration = configurations[index]
    if (domain.includes(configuration.domain)) {
      var matchingConfiguration = configuration
      console.log("Creating label for ", configuration.domain)
      var label = document.createElement("a")
      label.text = "Copy to clipboard"
      label.id = "copyText"
      label.style = "width: 100px; height: 100px; font-size: 25px; color: green; font-weight: bold; cursor: pointer; margin: 5px;"
      var container = $(configuration.containerId)
      container.prepend(label)
      console.log("Appending to ", configuration.containerId)
      $("#copyText").click(function () {
        matchingConfiguration.completion()
      })
    }
  }

  setTimeout(function () { checkLater() }, 1500);
}

// helper function to deal with radio lab's async refresho
function checkLater() {
  var domain = window.location.hostname
  for (index in configurations) {
    var configuration = configurations[index]
    if (domain.includes(configuration.domain)) {
      var wrapCheck = configuration.containerId + " #copyText"
      if ($(wrapCheck).length == 0) {
        console.log("Couldn't find the podcast copy link, trying again")
        checkConfigs()
      } else {
        console.log("Found pod cast copy link")
      }
    }
  }
}

function addConfiguration(domain, containerId, completion) {
  var configuration = {
    "domain": domain,
    "containerId": containerId,
    "completion": completion
  }
  configurations.push(configuration)
}

function createConfigurations() {
  console.log("create configurations");
  // 99% Invisible
  addConfiguration("99percent", ".post-blocks", function () {
    var labels = document.querySelectorAll(".post-label");
    var titles = document.querySelectorAll(".post-title");

    var finalString = "";
    for (var i = 0; i < 5; i++) {
      var label = labels[i].textContent.trim().replace("Episode ", "");
      var title = titles[i].textContent.trim();
      finalString += "# " + label + " " + title + "\n";
    }
    copyTextToClipboard(finalString);
  });

  // SYSK
  addConfiguration("iheart", '*[data-test="podcast-profile-body"] div:first', function () {
    var finalString = "";
    var elements =
      $('*[data-test="podcast-episode-name"] p span')
      .filter(function (index) {
        return $(this).text().length > 3
      })
    for (var i = 0; i < elements.length; i++) {
      finalString += "# " + elements[i].textContent.trim() + "\n\n";
    }

    copyTextToClipboard(finalString);
  });

  // Reply All
  addConfiguration("gimletmedia", "#primary", function () {
    var finalString = "";
    var elements = document.querySelectorAll("#all-episodes .episode .title-header h2")
    for (var i = 0; i < 5; i++) {
      finalString += elements[i].textContent.trim() + "\n";
    }
    copyTextToClipboard(finalString);
  });

  // This American Life
  addConfiguration("americanlife", "#block-system-main", function () {
    var episodeNumbers = document.querySelectorAll(".content article .field-name-field-episode-number a.goto-episode");
    var labels = document.querySelectorAll(".content article h2 a");
    var finalString = "";
    for (var i = 0; i < 5; i++) {
      var episodeNumber = episodeNumbers[i].textContent.trim();
      var label = labels[i].textContent.trim();
      finalString += "# " + episodeNumber + ": " + label + "\n";
    }
    copyTextToClipboard(finalString);
  });

  // Criminal
  addConfiguration("thisiscriminal", ".episode-grid", function () {
    var finalString = ""
    var titles = document.querySelectorAll(".episode a:nth-child(2)")
    for (var i = 0; i < 5; i++) {
        var title = titles[i].textContent.trim().replace("Episode ", "")
        var episodeMatch = titles[i].href.match("episode-(\\d+)")
        var episodeNumber = "Bonus"
        if (episodeMatch) {
          episodeNumber = episodeMatch[1]
        }
        finalString += "# " + episodeNumber + ": " + title + "\n"
    }
    copyTextToClipboard(finalString);
  });

  // Radio Lab
  addConfiguration("wnycstudios", ".page-wrapper main", function () {
    var finalString = ""
    for (var i = 0; i < 5; i++) {
      finalString += "# " + document.querySelectorAll(".episode-tease__title a")[i].textContent.trim() + "\n\n";
    }
    copyTextToClipboard(finalString);
  });

  // Love & Radio
  addConfiguration("loveandradio", ".fourblog.blogger", function () {
    var finalString = ""
    var titles = document.querySelectorAll(".fourblog h3 a");
    var names = document.querySelectorAll(".fourblog .teaser");
    for (var i = 0; i < 5; i++) {
      finalString += "# " + titles[i].textContent.trim() + "\n\n" + names[i].textContent.trim() + "\n\n";
    }
    copyTextToClipboard(finalString);
  })

  // Imaginary Worlds
  addConfiguration("imaginaryworldspodcast", ".wsb-navigation-rendered-top-level-menu", function() {
    var titles = document.querySelectorAll(".wsb-navigation-rendered-top-level-menu a");

    var finalString = "";
    var length = titles.length
    for (var i = 1; i < 5; i++) {
      var index = length - i;
      var title = titles[index].textContent.trim();
      finalString += "# " + title + "\n";
    }
    copyTextToClipboard(finalString);
  });

  // Sold Out: KQED
  addConfiguration("kqed", ".components-List-___List__list__cardsRecent", function() {
    var titles = document.querySelectorAll("article span.components-Card-components-components-TextBox-___TextBox__box_Title");

    var finalString = "";
    var length = titles.length
    for (var i = 1; i < titles.length; i++) {
      var title = titles[i].textContent.trim();
      finalString += "# " + title + "\n";
    }

    copyTextToClipboard(finalString);
  });

  // East Bay Yesterday
  addConfiguration("eastbayyesterday", ".row.episode-cards", function() {
    var titles = document.querySelectorAll(".entry-title a");
    var summaries = document.querySelectorAll(".entry-summary")
    var reversedTitles = [].slice.call(titles).reverse()
    var reversedSummaries = [].slice.call(summaries).reverse()

    var finalString = "";
    var length = titles.length
    for (var i = 1; i < length; i++) {
      var index = length - i;
      var title = reversedTitles[index].textContent.trim();
      var summary = reversedSummaries[index].textContent.trim();
      finalString += "# " + title + ": " + summary + "\n";
    }

    copyTextToClipboard(finalString);
  });
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