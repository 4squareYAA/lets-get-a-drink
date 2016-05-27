var drinkFinder = {};
var map = {};

drinkFinder.apiURL = 'https://api.foursquare.com/v2/venues/explore'

drinkFinder.googleMapsApiKey = 'AIzaSyDUxZNOnvRPHmGndMfasnhuQ2pFFi6phzk';
drinkFinder.foursquareClientID = 'SJ2VFBCBNNTYMAPC3WJN0BKG4VDR3CFC1JDGAYCNAPHDKRS5';
drinkFinder.foursquareClientSecret = 'BBHGS4D2G3VBGRIKSGAIKQBXN3JK4IO5ZRROZBE5L5MZ20PI';
drinkFinder.windowIsOpen = false;

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
		$('input[type=submit]').css('opacity', 1);
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
		$('.map-container').css('right', 0);
	});
};

drinkFinder.result = function(squareData) {
	drinkFinder.info = squareData.response.groups[0].items;
	console.log(drinkFinder.info)

	drinkFinder.info.forEach(function(location) {
		var name = location.venue.name;
		if(location.venue.hours != undefined && location.venue.hours.status != undefined){
		var status = location.venue.hours.status;}
		else{var status = '';}
		if(location.venue.location.formattedAddress != undefined){
		var address = location.venue.location.formattedAddress;}
		else{var address = '';}
		if(location.venue.contact.formattedPhone != undefined){
		var number = location.venue.contact.formattedPhone;}
		else{var number = '';}
		if(location.venue.rating != undefined){
		var rating = location.venue.rating;}
		else{var rating = '';}
		if(location.venue.url != undefined){
		var link = location.venue.url;}
		else {var link = '';} 
		if(location.venue.contact.twitter != undefined){
		var twitter = location.venue.contact.twitter;}
		else {var twitter = '';} 
		var contentString = "<div class='infoWindow'>" + "<h2>" + name + "</h2>" + "<p>" + status + "</p>" + "<p>" + address + "</p>" + "<p>" + number + "</p>" + "<p>" + rating + "</p>" + "<p>" + link + "</p>" + "<p>" + twitter + "</p>";

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

	marker.addListener('click', function() {
		if (drinkFinder.windowIsOpen === true) {
			drinkFinder.infowindow.close();
		}

		drinkFinder.windowIsOpen = true
		createInfoWindow(marker, content);
 	});
};


function createInfoWindow(marker, content){
	drinkFinder.infowindow = new google.maps.InfoWindow({
		content: content
	});

	drinkFinder.infowindow.open(map, marker);
}


// GOOGLE MAP INIT
// ---------------
map.init = function() {

		map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: drinkFinder.latitude, lng: drinkFinder.longitude},
		zoom: 16,
		scrollwheel: false,
		mapTypeControl: false});

		var styles = [
		  {
		    "featureType": "road.local",
		    "elementType": "geometry.fill",
		    "stylers": [
		      { "color": "#8171de" }
		    ]
		  },{
		  },{
		    "featureType": "road.arterial",
		    "elementType": "geometry.fill",
		    "stylers": [
		      { "color": "#8171de" }
		    ]
		  },{
		    "featureType": "road.local",
		    "elementType": "geometry.fill",
		    "stylers": [
		      { "color": "#dddd3f" }
		    ]
		  },{
		    "featureType": "road.local",
		    "elementType": "geometry.stroke",
		    "stylers": [
		      { "color": "#8171de" }
		    ]
		  },{
		    "featureType": "landscape.man_made",
		    "elementType": "geometry.fill",
		    "stylers": [
		      { "color": "#a9a9a9" }
		    ]
		  },{
		    "featureType": "landscape.man_made",
		    "elementType": "geometry.stroke",
		    "stylers": [
		      { "color": "#a9a9a9" }
		    ]
		  },{
   			 "featureType": "road.highway",
    		"elementType": "geometry.fill",
    		"stylers": [
      			{ "color": "#dddd3f" }
    		]
  		},{
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      { "color": "#222222" }
    ]
  },
		]

		map.setOptions({styles: styles});
	
};












