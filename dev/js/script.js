var drinkFinder = {};
var map = {};

drinkFinder.apiURL = 'https://api.foursquare.com/v2/venues/explore'

drinkFinder.googleMapsApiKey = 'AIzaSyDUxZNOnvRPHmGndMfasnhuQ2pFFi6phzk';
drinkFinder.foursquareClientID = 'SJ2VFBCBNNTYMAPC3WJN0BKG4VDR3CFC1JDGAYCNAPHDKRS5';
drinkFinder.foursquareClientSecret = 'BBHGS4D2G3VBGRIKSGAIKQBXN3JK4IO5ZRROZBE5L5MZ20PI';

$(function() {
	drinkFinder.init();

});

drinkFinder.init = function() {
	drinkFinder.getGeocode();
	$('form').on('submit', function(e){
		e.preventDefault();
		drinkFinder.getUserChoice();
	});
	$( ".refresh" ).click(function() {
    location.reload(true);
});
};

drinkFinder.getGeocode = function() {
	navigator.geolocation.getCurrentPosition(success);
	function success(position) {
		drinkFinder.latitude = position.coords.latitude;
		drinkFinder.longitude = position.coords.longitude;
		console.log(drinkFinder.latitude);
		console.log(drinkFinder.longitude);
	};
};

drinkFinder.getUserChoice = function() {
	drinkFinder.userChoice = $('input[name=beverage]:checked').val();
	console.log(drinkFinder.userChoice);
	drinkFinder.getFourSquare();
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
			section: drinkFinder.userChoice
		}
	}).then(function(squareData) {
		console.log(squareData);
		map.init();
		drinkFinder.result(squareData);
		// drinkFinder.display(squareData.response)
	});
};

drinkFinder.result = function(squareData) {
	drinkFinder.info = squareData.response.groups[0].items;
	console.log(drinkFinder.info)

	drinkFinder.info.forEach(function(location) {
		var name = location.venue.name;
		if(location.venue.hours != undefined){
		var status = location.venue.hours.status;}
		var address = location.venue.location.formattedAddress;
		var number = location.venue.contact.formattedPhone;
		var rating = location.venue.rating;
		var link = location.venue.url;
		var twitter = location.venue.contact.twitter;
		var contentString = "<div class='infoWindow'>" + "<h1>" + name + "</h1>" + "<p>" + status + "</p>" + "<p>" + address + "</p>" + "<p>" + number + "</p>" + "<p>" + rating + "</p>" + "<p>" + link + "</p>" + "<p>" + twitter + "</p>";

		drinkFinder.makeMarker(location, contentString);
	});

};

drinkFinder.makeMarker = function(location, content){
	var lat = location.venue.location["lat"];
	var lng = location.venue.location["lng"];
	var myLatLng = {lat: lat, lng: lng};
	var marker = new google.maps.Marker({
		map: map,
		position: myLatLng
	});
	var infowindow = new google.maps.InfoWindow({
	  content: content
	});
	marker.addListener('click', function() {	

		createInfoWindow(marker, content)
    

 	});
};


function createInfoWindow(marker, content){
	
	var windowIsOpen = false
	windowIsOpen ? infowindow.close() : null
	var infowindow = new google.maps.InfoWindow({
		content: content
	});
	
	infowindow.open(map, marker);
	windowIsOpen = true
}


// GOOGLE MAP INIT
// ---------------
map.init = function() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: drinkFinder.latitude, lng: drinkFinder.longitude},
		zoom: 15,
		scrollwheel: false,
		mapTypeControl: false
	});
};

