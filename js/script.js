var locations = [{
		title: 'Harry Buffalo',
		location: {
			lat: 28.541346,
			lng: -81.381661
		},
		id: 0
	},
	{
		title: 'Omega Deli Restaurant',
		location: {
			lat: 28.546058,
			lng: -81.373764
		},
		id: 1
	},
	{
		title: 'Shari Sushi Lounge',
		location: {
			lat: 28.542288,
			lng: -81.369215
		},
		id: 2
	},
	{
		title: 'LE GOURMET BREAK',
		location: {
			lat: 28.540667,
			lng: -81.377412
		},
		id: 3
	},
	{
		title: "Panino's Pizza & Grill",
		location: {
			lat: 28.541595,
			lng: -81.378847
		},
		id: 4
	},
	{
		title: "Leo's Diner",
		location: {
			lat: 28.546354,
			lng: -81.378952
		},
		id: 5
	}
];

var map;
var myOption = {
	center: {
		lat: 28.548336,
		lng: -81.379234
	},
	zoom: 15,
	mapTypeControl: false
};
var markers = [];
var largeInfowindow;

// Start Google Map error handling.
var googleRequestTimeout = setTimeout(function() {
	var el = document.createElement('p');
	el.innerHTML = 'Failed to get Google Map resources...';
	document.getElementById('map').append(el);
}, 5000);

/**
 * @description Initiate the map and markers
 * @description Knockout ViewModel embedded
 */
function initMap() {

	// Constructor creates a new map - only center and zoom are required.
	map = new google.maps.Map(document.getElementById('map'), myOption);

	// Initiate infoWindow.
	largeInfowindow = new google.maps.InfoWindow({
		maxWidth: 200
	});

	// clickFunction on the marker.
	var clickFunction = function() {
		populateInfoWindow(this, largeInfowindow);
	};
	
	// Create an array of markers based on the locations data.
	for (var i = 0; i < locations.length; i++) {
		var position = locations[i].location;
		var title = locations[i].title;
		var id = locations[i].id;
		// Create a marker per location, and put into markers array.
		var marker = new google.maps.Marker({
			position: position,
			title: title,
			animation: google.maps.Animation.DROP,
			id: id
		});
		// Push the marker to our array of markers.
		markers.push(marker);
		// JSHint warning about 'Functions declared within loops referencing
		// an outer scoped variable may lead to confusing semantics.'.
		/* marker.addListener('click', function() {
			populateInfoWindow(this, largeInfowindow);
		}); */
		// Create an onclick event to open an infowindow at each marker.
		marker.addListener('click', clickFunction);

	}

	// Build the VM. Seems the VM has to be nested in the initMap func 
	// to use google js.
	function LocationsViewModel() {

		var self = this;

		// Bind to the input.
		self.search = ko.observable();

		// Load all markers in an observable array.
		self.locs = ko.observableArray(markers);

		// Filter the markers.
		// This part is doing two things: 
		// 1. filter the markers and bind the result to show in the side list.
		// 2. show filtered markers and hide the others on the map.
		self.displocs = ko.computed(function() {
			return self.locs().filter(function(loc) {
				if (!self.search() || loc.title.toLowerCase()
					.indexOf(self.search().toLowerCase()) != -1) {
					var bounds = new google.maps.LatLngBounds();
					loc.setMap(map);
					bounds.extend(loc.position);
					return loc;
				} else {
					loc.setMap(null);
				}
			});
		}, this);

		/* 
		// I used this to test the computed observable
		var btn = document.getElementById('btn');
		btn.addEventListener('click', function(){
			console.log(self.displocs());	
		});
		*/

		// Click function for the side bar.
		self.popInfo = function() {
			var marker = markers[this.id];
			populateInfoWindow(marker, largeInfowindow);
		};
	}

	ko.applyBindings(new LocationsViewModel());

	// Stop error handling.
	clearTimeout(googleRequestTimeout);

}


/**
 * @description Populates the infowindow and set marker animation
 * @param {object} marker
 * @param {object} infowindow
 */
function populateInfoWindow(marker, infowindow) {
	var infoContent;
	var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
	url += '?' + $.param({
		'api-key': "3b237762e7c04b87889c9de7e953f24c",
		'q': marker.title
	});

	// Check to make sure the infowindow is not already opened on this marker.
	if (infowindow.marker != marker) {
		if (infowindow.marker) {
			infowindow.marker.setAnimation(null);
		}
		// You are selected! Let's BOUNCE!
		marker.setAnimation(google.maps.Animation.BOUNCE);
		infowindow.marker = marker;
		var temp = '<div class="infowindow"><h4 id="nytimes-header"></h4>';
		temp += '<ul id="nytimes-articles" class="article-list"></ul></div>';
		infowindow.setContent(temp);
		infowindow.open(map, marker);
		// Clear marker when the infowindow is closed.
		infowindow.addListener('closeclick', function() {
			infowindow.marker.setAnimation(null);
			infowindow.marker = null;
		});
	} else {
		toggleBounce(marker);
	}

	// Fetch NYT articles to put in infoWindow & error handling.
	$.getJSON(url, function(data) {
		$('#nytimes-header').text(
			'New York Times Articles About ' + marker.title);
		$.each(data.response.docs, function(key, val) {
			headline = val.headline.main;
			url = val.web_url;

			item = "<li class='article'>";
			item += "<a href=" + url + ">" + headline + "</a>";
			item += "</li>";
			$('#nytimes-articles').append(item);
		});

	}).error(function() {
		$('#nytimes-header').text(
			'New York Times Articles Could Not Be Loaded');
	});

}


/**
 * @description Toggle marker animation
 * @param {object} marker
 */
function toggleBounce(marker) {
	// BOUNCE or not? it is a question.
	if (marker.getAnimation() !== null) {
		marker.setAnimation(null);
	} else {
		marker.setAnimation(google.maps.Animation.BOUNCE);
	}
}

/**
 * @description Toggle between adding and removing the "responsive"
 * @description class to the side list when the user clicks on the icon
 */
function toggleShowHide() {
	var x = document.getElementById("options-box");
	if (x.className === "options-box") {
		x.className += " responsive";
	} else {
		x.className = "options-box";
	}
}