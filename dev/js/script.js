var drinkFinder = {};

drinkFinder.apiURL = 'https://api.foursquare.com/v2/venues/explore'

drinkFinder.googleMapsApiKey = 'AIzaSyDUxZNOnvRPHmGndMfasnhuQ2pFFi6phzk';
drinkFinder.foursquareClientID = 'SJ2VFBCBNNTYMAPC3WJN0BKG4VDR3CFC1JDGAYCNAPHDKRS5';
drinkFinder.foursquareClientSecret = 'BBHGS4D2G3VBGRIKSGAIKQBXN3JK4IO5ZRROZBE5L5MZ20PI';

drinkFinder.init = function() {
	drinkFinder.getFourSquare();
};

drinkFinder.getFourSquare = function() {
	$ajax({
		url: drinkFinder.apiURL,
		method: 'GET',
		dataType: 'json',
		data: {
			near: Chicago, IL
		}
	}).then(function(squareData) {
		console.log(squareData);
	});
};

$(function() {
	drinkFinder.init();

}); 