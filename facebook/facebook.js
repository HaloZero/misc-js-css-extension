function mainLoop() {
  $(".uiSideNav .count.uiSideNavCount").hide();
  // changes from 09-26-2014
  $(".homeSideNav .countValue").hide()
  $("a[title=Events]").attr('href','/events/calendar');
  $('title').text('Facebook');
}

setInterval(mainLoop, 1000);

