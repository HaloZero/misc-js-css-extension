$(function() {
  // making the clicks on the side panel clickable
  // $(".monthContainer .activityMonth").each(function(i, activity) {
  //   var text = $(activity).find(".mainText");
  //   text.html(
  //     $("<a>")
  //     .text(text.text())
  //     .css("color", "black")
  //     .attr("href", $(activity).attr("link"))
  //     .attr("target", "_blank")
  //   );
  // });

  // hiding karina's strength training runkeeper workouts details`1
  $(".feedItem").each(function(index, item) {
    if ($(item).data("link") && $(item).data("link").match("strengthTraining")) {
      $(item).find(".detailText").hide();
    }
  });

  function checkLinks() {
    console.log("check links");
    $(".nav-pills li a").each(function () {
      var text = $(this).text();
      if (text.includes("Walking")) {
        $(this).parent().css("background-color","red");
      }
    });
  }

  checkLinks()
  $("#activityHistoryMenu").click(function () {
    console.log("history menu tapped");
    setTimeout(function () { checkLinks() }, 2000);
  });

  if ($(".userHeader h2").text().toLowerCase().includes("walk")) {
    var deleteAction = $("#activityActions a[alerttitle='Delete Activity?']");
    $(".userHeader").append(deleteAction)
  }
})