window.debugFitness = false

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
	for (var i = 0; i < weekData.length; i ++) {
		var day = dateParse(weekData[i]["date"])
		if (day.getDay() == 0) {
			haveISeenSunday = true
		}
		if (haveISeenSunday) {
			var calories = weekData[i].total
			if (calories > 1000) {
				caloriesEaten += calories
				goalCalories += goal
			}
			if (window.debugFitness) {
				console.log("Adding information from " + weekData[i]["date"])
				console.log("Adding calories " + calories)
			}
		}
	}

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

function dateParse(dateString) {
	var year = new Date().getFullYear()
	var newString = dateString + "/" + year
	return new Date(newString)
}