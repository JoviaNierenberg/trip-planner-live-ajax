// general forEach for object key value pairs
function eachKeyValue (obj, onEach) {
	Object.keys(obj).forEach(function (key) {
		// context for onEach is the window
		// if we want access to the hotel, must close over it
		onEach(key, obj[key])
	});
}

var days, currentDay;

$(document).ready(function () {
	days = [];
	currentDay = new Day();
	currentDay.$button.addClass('current-day');
});