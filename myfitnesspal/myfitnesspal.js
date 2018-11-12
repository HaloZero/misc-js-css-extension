$(function() {
	if (window.location.href.match("diary") != null) {
		fetchReport()
	}
});

function fetchReport() {
	console.log("Fetching report")
	$.get("/reports/results/nutrition/Net%20Calories/7.json?report_name=Net%20Calories&")
		.done(function (result) {
			var goal = parseInt(result["goal"])
			var data = result["data"]
			analyzeReport(data, goal)
		})
}

function analyzeReport(weekData, goal) {
	var caloriesEaten = 0
	var goalCalories = 0
	var haveISeenSunday = false
	for (var i = 0; i < weekData.length; i ++) {
		var day = dateParse(weekData[i]["date"])
		if (day.getDay() == 0) {
			haveISeenSunday = true
		}
		if (haveISeenSunday) {
			var calories = weekData[i].total
			if (calories > 0) {
				caloriesEaten += calories
				goalCalories += goal
			}
		}
	}

	var netCalories = goalCalories - caloriesEaten;
	var container = $("<div class='calorie-goal'>")
	container.append("<br>")
	container.append($("<span>").text('Calories Eaten are ' + caloriesEaten))
	container.append($("<span>").text('Calories Goal are ' + goalCalories))
	container.append($("<span>").text('Net Calories are ' + netCalories))
	$('.diary').append(container)
}

function dateParse(dateString) {
	var year = new Date().getFullYear()
	var newString = dateString + "/" + year
	return new Date(newString)
}