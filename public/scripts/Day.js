var Day;

$(document).ready(function () {
	
	// create constructor function with properties on its prototype
	Day = function () {
		this.hotel = null;
		this.restaurants = [];
		this.thingsToDo = [];
		this.number = days.push(this);
		// push returns the length of the array once it has been pushed
		this.buildButton()
			.drawButton();
		//this.isCurrentDay = false;
		
	}

	Day.prototype.addDay = function(){
		//console.log("THIS THIS", this)
		var self = this;
		$.post("/days",{number:self.number, 
			hotel: self.hotel, 
			restaurants:self.restaurants,
			thingsToDo:self.thingsToDo
		})
		
	};
	
	// create a new day button with number stored in this.number and switches to the new button
	Day.prototype.buildButton = function () {
		this.$button = $('<button class="btn btn-circle day-btn"></button>').text(this.number);
		var self = this;
		this.$button.on('click', function () {
			self.switchTo();
		});
		return this;
	};

	// appends button that was just built to .day-buttons
	Day.prototype.drawButton = function () {
		var $parent = $('.day-buttons');
		this.$button.appendTo($parent);
		return this;
	};

	// removes button such that it can be re-added later
	Day.prototype.eraseButton = function () {
		this.$button.detach();
		return this;
	};

	// switches the current day and updates the map accordingly
	Day.prototype.switchTo = function () {
		//console.log('THIS STRING THIS STRING',this);
		// removes a marker for an itinerary item from the map
		//console.log("CURRENT DAY DOT REST",currentDay.restaurants)
		//this.save(currentDay.restaurants);
		function eraseOne (attraction) {
			attraction.eraseMarker().eraseItineraryItem();
		}
		if (currentDay.hotel) eraseOne(currentDay.hotel);
		currentDay.restaurants.forEach(eraseOne);
		currentDay.thingsToDo.forEach(eraseOne);
		// draws a marker for an itinerary item
		function drawOne (attraction) {
			attraction.drawMarker().drawItineraryItem();
		}
		// uses drawOne function to draw markers for itinerary items
		if (this.hotel) drawOne(this.hotel);
		this.restaurants.forEach(drawOne);
		this.thingsToDo.forEach(drawOne);
		// remove current day status from old current day and assign current day status to new current day
		currentDay.$button.removeClass('current-day');
		this.$button.addClass('current-day');
		$('#day-title > span').text('Day ' + this.number);
		// many other functions rely on currentDay being correct
		// state stored in model layer
		//currentDay.isCurrentDay = false;
		currentDay = this;
		//currentDay.isCurrentDay = true;
	};


	function deleteCurrentDay () {
		// check that array contains more than one day
		if (days.length > 1) {
			var index = days.indexOf(currentDay),
				previousDay = days.splice(index, 1)[0],
				// sets the new current day to be the former proceeding day, 
				// or if the last day is removed, set the new current day to be the proceeding day
				newCurrent = days[index] || days[index - 1];
			// loops through and changes the indexes to reflect the new day numbers
			days.forEach(function (day, idx) {
				day.number = idx + 1;
				day.$button.text(day.number);
			});
			// switches to the new current day and erases the old day
			newCurrent.switchTo();
			previousDay.eraseButton();
		}
	};

	// adds a day using the constructor function
	$('#add-day').on('click', function () {
		var a_newDay = new Day(); 
		a_newDay.addDay();
		// triggers above constructor 
		// build creates a dom element, but doesn't put it anywhere
		// draw puts it on the page

	});

	// removes day when .remove class is clicked on
	$('#day-title > .remove').on('click', deleteCurrentDay);
});









