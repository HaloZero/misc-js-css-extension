$(function() {
	var shows = document.querySelectorAll(".checked strong");
	var elements = []
	for (var i = 0; i < shows.length; i++) {
		var show = shows[i]
		var name = show.textContent.replace("View Show Summary", "");
		var span = document.createElement("div");
		span.textContent = name;
		elements.push(span)
	}

	var container = document.createElement("div");
	for (var i = 0; i < elements.length; i++) {
		var element = elements[i];
		container.appendChild(element);
	}
	document.querySelector(".contbox").prepend(container);
});