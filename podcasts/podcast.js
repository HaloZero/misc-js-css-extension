$(onLoad);

var configurations = []

function onLoad() {
  createConfigurations()

  var domain = window.location.hostname
  console.log('checking configurations');
  for (index in configurations) {
    var configuration = configurations[index]
    console.log("checking configuration", configuration.domain)
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
}

function addConfiguration(domain, containerId, completion) {
  var configuration = {
    'domain': domain,
    'containerId': containerId,
    'completion': completion
  }
  configurations.push(configuration)
}

function createConfigurations() {
  console.log("create configurations");
  addConfiguration('99percent', '.post-blocks', function () {
    var labels = document.querySelectorAll(".post-label");
    var titles = document.querySelectorAll(".post-title");

    var finalString = "";
    for (var i = 0; i < 5; i++) {
      var label = labels[i].textContent.trim().replace("Episode ", "");
      var title = titles[i].textContent.trim();
      finalString += "## " + label + " " + title + "\n";
    }
    copyTextToClipboard(finalString);
  });

  addConfiguration('stuffyoushouldknow', '#archive-featured', function () {
    var finalString = '';
    for (var i = 0; i < 5; i++) {
      finalString += "# " + document.querySelectorAll(".h4 a")[i].textContent.trim() + "\n\n";
    }
    copyTextToClipboard(finalString);
  });

  addConfiguration('gimletmedia', '#primary', function () {
    var finalString = '';
    for (var i = 0; i < 5; i++) {
      finalString += document.querySelectorAll(".list__item .list__item__title a")[i].textContent.trim() + "\n";
    }
    copyTextToClipboard(finalString);
  });

  addConfiguration('americanlife', '#archive-episodes', function () {
    var labels = document.querySelectorAll("#archive-episodes h3 a");
    var finalString = '';
    for (var i = 0; i < labels.length; i++) {
      var label = labels[i].textContent.trim();
      finalString += "## " + label + "\n";
    }
    copyTextToClipboard(finalString);
  });

  addConfiguration('thisiscriminal', '.episode-grid', function () {
    var finalString = ""
    var titles = document.querySelectorAll(".episode a:nth-child(2)")
    for (var i = 0; i < 10; i++) { 
        var title = titles[i].textContent.trim().replace("Episode ", "")
        finalString += "## " + title + "\n"
    }
    copyTextToClipboard(finalString);
  });

  addConfiguration('radiolab', '#series-main', function () {
    var finalString = ""
    for (var i = 0; i < 5; i++) { 
      finalString += "# " + document.querySelectorAll(".series-item .title a")[i].textContent.trim() + "\n\n" 
    }
    copyTextToClipboard(finalString);
  });

  addConfiguration('loveandradio', '.fourblog.blogger', function () {
    var finalString = ""
    for (var i = 0; i < 5; i++) { 
      finalString += "# " + document.querySelectorAll(".fourblog h3 a")[i].textContent.trim() + "\n\n" 
    }
    copyTextToClipboard(finalString);
  })

  addConfiguration('lorepodcast', '.blog-list', function () {
    var titles = document.querySelectorAll(".entry-title a")

    var finalString = "";
    for (var i = 0; i < 15; i++) { 
      var title = titles[i].textContent.trim();
      finalString += "## " + title + "\n";
    }
    copyTextToClipboard(finalString);
  });

  addConfiguration('imaginaryworldspodcast', '.wsb-navigation-rendered-top-level-menu', function() {
    var titles = document.querySelectorAll(".wsb-navigation-rendered-top-level-menu a");

    var finalString = "";
    var length = titles.length
    for (var i = 1; i < 5; i++) { 
      var index = length - i;
      var title = titles[index].textContent.trim();
      finalString += "## " + title + "\n";
    }
  });
}

function copyTextToClipboard(text) {
  console.log(text)
  var textArea = document.createElement("textarea");
  textArea.style.position = 'fixed';
  textArea.style.top = 0;
  textArea.style.left = 0;
  textArea.style.width = '2em';
  textArea.style.height = '2em';
  textArea.style.padding = 0;
  textArea.style.border = 'none';
  textArea.style.outline = 'none';
  textArea.style.boxShadow = 'none';
  textArea.style.background = 'transparent';
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Copying text command was ' + msg);
  } catch (err) {
    console.log('Oops, unable to copy');
  }

  document.body.removeChild(textArea);
}