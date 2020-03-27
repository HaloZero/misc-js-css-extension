window.debugFitness = false
window.showTable = true
window.showNetCalories = true

$(function() {
  if (window.location.href.match("diary") != null) {
    fetchReport()
  }
});

function fetchReport() {
  if (window.debugFitness) {
    console.log("Fetching report")
  }
  $.get("/reports/results/nutrition/Net%20Calories/7.json?report_name=Net%20Calories&")
    .done(function (result) {
      var goal = parseInt(result["goal"])
      var data = result["data"]
      if (window.debugFitness) {
        console.log(result)
      }
      analyzeReport(data, goal)
    })
}

function analyzeReport(weekData, goal) {
  var caloriesEaten = 0
  var goalCalories = 0
  var haveISeenSunday = false
  for (var i = 0; i < weekData.length; i++) {
    var day = dateParse(weekData[i]["date"])
    if (day.getDay() == 0) {
      haveISeenSunday = true
    }
    if (haveISeenSunday) {
      var calories = weekData[i].total
      if (calories > 500) {
        caloriesEaten += calories
        goalCalories += goal
      }
      if (window.debugFitness) {
        console.log("Adding information from " + weekData[i]["date"])
        console.log("Adding calories " + calories)
      }
    }
  }

  if (window.showNetCalories) {
    var netCalories = goalCalories - caloriesEaten;
    var container = $("<div class='calorie-goal'>")
    container.append("<br>")
    container.append($("<span>").text('Calories Eaten are ' + caloriesEaten))
    container.append($("<span>").text('Calories Goal are ' + goalCalories))
    container.append($("<span id='my-net-calories'>").text('Net Calories are ' + netCalories))
    $('#main').prepend(container)
    var color = netCalories > 0 ? 'green' : 'red'
    $('#my-net-calories').css('color', color)
  }
  
  if (window.showTable) {
    var truncatedData = []
    haveISeenSunday = false
    for (var i = 0; i < weekData.length; i++) {
      var day = dateParse(weekData[i]["date"])
      if (day.getDay() == 0) {
        haveISeenSunday = true
      }
      if (haveISeenSunday) {
        weekData[i]["net-calories"] = -(weekData[i].total - goal)
        truncatedData.push(weekData[i])
      }
    }
    var table = createTable(truncatedData)
    $('#main').prepend(table)  
  }
  

  if (window.debugFitness) {
    console.log("total calorie eaten is " + caloriesEaten);
  }
}

function createTable(objectArray, fields, fieldTitles) {
  let body = document.getElementsByTagName('body')[0];
  let tbl = document.createElement('table');
  let thead = document.createElement('thead');
  let thr = document.createElement('tr');

  for (p in objectArray[0]){
    let th = document.createElement('th');
    th.appendChild(document.createTextNode(p));
    thr.appendChild(th);

  }

  thead.appendChild(thr);
  tbl.appendChild(thead);

  let tbdy = document.createElement('tbody');
  let tr = document.createElement('tr');
  objectArray.forEach((object) => {
    let n = 0;
    let tr = document.createElement('tr');
    for (p in objectArray[0]){
      var td = document.createElement('td');
      td.setAttribute("style","border: 1px solid green");
      td.appendChild(document.createTextNode(object[p]));
      tr.appendChild(td);
      n++;
    };
    tbdy.appendChild(tr);
  });
  tbl.appendChild(tbdy);
  body.appendChild(tbl)
  return tbl;
}

function dateParse(dateString) {
  var year = new Date().getFullYear()
  var newString = dateString + "/" + year
  return new Date(newString)
}