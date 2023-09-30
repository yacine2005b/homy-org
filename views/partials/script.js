document.addEventListener("DOMContentLoaded", function () {
	var currentLocation = window.location.pathname;


	document.querySelectorAll('.navbar a').forEach(function (link) {

		if (link.getAttribute('href') === currentLocation) {

			link.parentNode.classList.add('active');
		}
	});
});