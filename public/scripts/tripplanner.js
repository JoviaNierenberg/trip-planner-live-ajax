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
	days = []
	$.get('/days', function(data, currentDay){
		console.log("GOT DATA",data)
		if(!data.length){
			currentDay = new Day();
			currentDay.addDay()
			currentDay.$button.addClass('current-day');
		}else{
			data.forEach(function(day){
				console.log("current day value: ", currentDay)
				console.log("more got data", data)
				console.log("TESTING DAY PUSH",day)
				//currentDay.buildButton().drawButton();
				var addedDay = new Day()
				addedDay.hotel = day.hotel
				
				console.log("some lengths",days.length)
				// if(days[0].$button[0].classList[-1] !== "current-day"){
				// 	days[0].$button.addClass('current-day');
				// }
				//if (day.isCurrentDay) day.$button.addClass('current-day');
				//console.log(days[0].$button[0].classList[-1] !== "current-day")
			})

		}
		//currentDay.$button.addClass('current-day');
	})

});