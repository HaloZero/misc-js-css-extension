$(function() {
  // making the clicks on the side panel clickable
  $(".monthContainer .activityMonth").each(function(i, activity) {
    var text = $(activity).find(".mainText");
    text.html(
      $("<a>")
      .text(text.text())
      .css("color", "black")
      .attr("href", $(activity).attr("link"))
    );
  });

  // hiding karina's strength training runkeeper workouts details`1
  $(".feedItem").each(function(index, item) {
    if ($(item).data("link") && $(item).data("link").match("strengthTraining")) {
      $(item).find(".detailText").hide();
    }
  });
})