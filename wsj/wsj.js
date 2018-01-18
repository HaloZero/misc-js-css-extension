$(function () {
	$("a").each(function () {
		var link = this;
		var url = $(link).attr('href');
		if (url) {
			var newURL = url.replace('wsj.com', "fullwsj.com");	
			$(link).attr("href", newURL);
		}
	});
});