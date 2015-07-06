var Hotel;

$(document).ready(function () {
	Hotel = function (data) {
		// closing over this to be able to use it to refer to the Hotel
		// self === hotel
		var self = this;
		eachKeyValue(data, function (key, val) {
			self[key] = val;
		});
		// if there is a hotel selected on the map, remove it
		if (currentDay.hotel) {
			currentDay.hotel.delete();
		}
		// draw a marker for the new selected hotel using methods on the hotel's prototype
		this.buildMarker()
			.drawMarker()
			.buildItineraryItem()
			.drawItineraryItem();
		currentDay.hotel = this;
	}

	// asigns icon, adds hotel to list for the day, assigns constructor
	Hotel.prototype = generateAttraction({
		icon: '/images/lodging_0star.png',
		$listGroup: $('#my-hotel .list-group'),
		$all: $('#all-hotels'),
		all: all_hotels,
		constructor: Hotel
	});

	Hotel.prototype.delete = function () {
		currentDay.hotel
			.eraseMarker()
			.eraseItineraryItem();
		currentDay.hotel = null;
	};
});