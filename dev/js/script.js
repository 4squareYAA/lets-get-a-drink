var drinkFinder = {};
var map = {};

drinkFinder.apiURL = 'https://api.foursquare.com/v2/venues/explore'

drinkFinder.googleMapsApiKey = 'AIzaSyDUxZNOnvRPHmGndMfasnhuQ2pFFi6phzk';
drinkFinder.foursquareClientID = 'SJ2VFBCBNNTYMAPC3WJN0BKG4VDR3CFC1JDGAYCNAPHDKRS5';
drinkFinder.foursquareClientSecret = 'BBHGS4D2G3VBGRIKSGAIKQBXN3JK4IO5ZRROZBE5L5MZ20PI';

drinkFinder.init = function() {
	drinkFinder.getFourSquare();
};

drinkFinder.getFourSquare = function() {
	$.ajax({
		url: drinkFinder.apiURL,
		method: 'GET',
		dataType: 'jsonp',
		data: {
			near: 'New York, NY',
			client_id: drinkFinder.foursquareClientID,
			client_secret: drinkFinder.foursquareClientSecret,
			v: '20130815',
			section: 'coffee'
		}
	}).then(function(squareData) {
		console.log(squareData);
		// drinkFinder.display(squareData.response)
	});
};

$(function() {
	drinkFinder.init();

}); 
// GOOGLE MAP INIT
// ---------------
map.init = function() {

};


// HANDLEBARS
// ----------------
$(function(){
	var myTemplate = $("#dranks").html();
	var template = Handlebars.compile(myTemplate);

	var results = {
		name: ,
		status: ,
		phone: ,
		address: ,
		rating: ,
		url: ,
		twitter:
	};

	var filledTemplate = template(results);

	$("#resultInfo").append(filledTemplate);
});