$(function() {
  $(".monthContainer .activityMonth").each(function(i, activity) {
    var text = $(activity).find(".mainText");
    text.html(
      $("<a>")
      .text(text.text())
      .css("color", "black")
      .attr("href", $(activity).attr("link"))
    );
  });
})
