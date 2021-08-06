// ==UserScript==
// @name         MyFitnessPal
// @namespace    https://www.myfitnesspal.com/food/diary
// @version      0.1
// @description  Support showing tables for myfitness pal
// @author       You
// @match        https://www.myfitnesspal.com/food/diary*
// @grant        GM_addStyle
// @require      http://code.jquery.com/jquery-3.4.1.min.js
// ==/UserScript==

window.debugFitness = false
window.showTable = true
window.showNetCalories = true
window.startOnSunday = false

$(function() {
    GM_addStyle(".calorie-goal { font-size: 15px; font-weight: bold; margin: 10px 0; }")
    GM_addStyle(".calorie-goal span { padding-right: 10px; }")
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
  var haveISeenStartOfWeek = false

  // calculate net calories
  var startWeekdayIndex = window.startOnSunday ? 0 : 1
  for (var i = 0; i < weekData.length; i++) {
    var day = dateParse(weekData[i]["date"])
    if (day.getDay() == startWeekdayIndex) {
      haveISeenStartOfWeek = true
    }
    if (haveISeenStartOfWeek) {
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
    showNetCalories(goalCalories, caloriesEaten)
  }

  if (window.showTable) {
    showCalorieTable(weekData, startWeekdayIndex)
  }


  if (window.debugFitness) {
    console.log("total calorie eaten is " + caloriesEaten);
  }

  function showNetCalories(goalCalories, caloriesEaten) {
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

  function showCalorieTable(weekData, startWeekdayIndex) {
    var truncatedData = []
    haveISeenStartOfWeek = false
    for (var i = 0; i < weekData.length; i++) {
      var day = dateParse(weekData[i]["date"])
      if (day.getDay() == startWeekdayIndex) {
        haveISeenStartOfWeek = true
      }
      if (haveISeenStartOfWeek) {
        weekData[i]["net-calories"] = -(weekData[i].total - goal)
        truncatedData.push(weekData[i])
      }
    }
    var table = createTable(truncatedData)
    $('#main').prepend(table)
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

function parseLogInfo() {
  // https://www.myfitnesspal.com/reports/printable_diary
  var $totalCalories = $(".table0#food tfoot tr td:nth-child(2)");
  var $totalExercise = $(".table0#excercise tfoot tr td:nth-child(2)");

  var totalExerciseIndex = 0;
  var totalsString = ""
  for (var i = 0; i < $totalCalories.length; i++) {
      var totalString = $totalCalories[i].textContent.replace(",", "")
      var $nextElement = $($totalCalories[i]).closest("#food").next()
      console.log($nextElement)
      if ($nextElement.hasClass("table0")) {
        var exerciseString = $totalExercise[totalExerciseIndex].textContent.replace(",", "")
        totalExerciseIndex += 1
        var newString = (parseInt(totalString) - parseInt(exerciseString)).toString()
        totalString = newString
      }

      totalsString += totalString
      totalsString += ","
  }
}