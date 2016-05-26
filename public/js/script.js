var drinkFinder = {};
var map = {};

drinkFinder.apiURL = 'https://api.foursquare.com/v2/venues/explore'

drinkFinder.googleMapsApiKey = 'AIzaSyDUxZNOnvRPHmGndMfasnhuQ2pFFi6phzk';
drinkFinder.foursquareClientID = 'SJ2VFBCBNNTYMAPC3WJN0BKG4VDR3CFC1JDGAYCNAPHDKRS5';
drinkFinder.foursquareClientSecret = 'BBHGS4D2G3VBGRIKSGAIKQBXN3JK4IO5ZRROZBE5L5MZ20PI';

$(function() {
	drinkFinder.init();
});

drinkFinder.getGeocode = function() {
	navigator.geolocation.getCurrentPosition(success);
	function success(position) {
		drinkFinder.latitude = position.coords.latitude;
		drinkFinder.longitude = position.coords.longitude;
		console.log(drinkFinder.latitude);
		console.log(drinkFinder.longitude);
		drinkFinder.getFourSquare();
	};
};

drinkFinder.init = function() {
	drinkFinder.getGeocode();
};

drinkFinder.getFourSquare = function() {
	$.ajax({
		url: drinkFinder.apiURL,
		method: 'GET',
		dataType: 'jsonp',
		data: {
			client_id: drinkFinder.foursquareClientID,
			client_secret: drinkFinder.foursquareClientSecret,
			v: '20130815',
			// near: 'New York, NY',
			ll: drinkFinder.latitude + ',' + drinkFinder.longitude,
			section: 'coffee'
		}
	}).then(function(squareData) {
		console.log(squareData);
		drinkFinder.result(squareData);
		// drinkFinder.display(squareData.response)
	});
};

drinkFinder.result = function(squareData) {
	drinkFinder.name = squareData.response.groups[0].items[0].venue.name;
	console.log(drinkFinder.name)

}

// GOOGLE MAP INIT
// ---------------
map.init = function() {

};


// HANDLEBARS
// ----------------
drinkFinder.handlebars = function(){
	var myTemplate = $("#dranks").html();
	var template = Handlebars.compile(myTemplate);

	var results = {
		name: "",
		status: "",
		phone: "",
		address: "",
		rating: "",
		url: "",
		twitter: ""
	};

	var filledTemplate = template(results);

	$("#resultInfo").append(filledTemplate);
};