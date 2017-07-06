var locations = [
	  {title: 'Park Ave Penthouse', location: {lat: 40.7713024, lng: -73.9632393}, id: 0},
	  {title: 'Chelsea Loft', location: {lat: 40.7444883, lng: -73.9949465}, id: 1},
	  {title: 'Union Square Open Floor Plan', location: {lat: 40.7347062, lng: -73.9895759}, id: 2},
	  {title: 'East Village Hip Studio', location: {lat: 40.7281777, lng: -73.984377}, id: 3},
	  {title: 'TriBeCa Artsy Bachelor Pad', location: {lat: 40.7195264, lng: -74.0089934}, id: 4},
	  {title: 'Chinatown Homey Space', location: {lat: 40.7180628, lng: -73.9961237}, id: 5}
	];

var map;
var myOption = {
	  center: {lat: 40.7413549, lng: -73.9980244},
	  zoom: 13,
	  mapTypeControl: false
	};
var markers = [];
var largeInfowindow;

var googleRequestTimeout = setTimeout(function(){
		var el = document.createElement('p');
		el.innerHTML = 'Failed to get Google Map resources...';
		document.getElementById('map').append(el);		
	}, 5000);

function initMap() {
console.log('A');
	// Constructor creates a new map - only center and zoom are required.
	map = new google.maps.Map(document.getElementById('map'), myOption);
console.log('B');
	// Initiate infoWindow.
	largeInfowindow = new google.maps.InfoWindow();
console.log('C');
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
		// Create an onclick event to open an infowindow at each marker.
		marker.addListener('click', function() {
			populateInfoWindow(this, largeInfowindow);
		});
		
	}
console.log('D');
// Build the VM. Seems the VM has to be nested in the initMap func to use google js.
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
    self.displocs = ko.computed(function(){
		return self.locs().filter(function(loc){
			if(!self.search() || loc.title.toLowerCase().indexOf(self.search().toLowerCase()) != -1) {
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
console.log('E');
ko.applyBindings(new LocationsViewModel());
console.log('F');
clearTimeout(googleRequestTimeout);

}


// This function populates the infowindow when the marker is clicked. We'll only allow
// one infowindow which will open at the marker that is clicked, and populate based
// on that markers position.
function populateInfoWindow(marker, infowindow) {
	var infoContent;
	var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
	url += '?' + $.param({
		'api-key': "3b237762e7c04b87889c9de7e953f24c",
		'q': marker.title
		});
console.log('I am here');
	$.getJSON( url, function( data ) {
console.log('getJSON');
		$('#nytimes-header').text('New York Times Articles About ' + marker.title);
		$.each( data['response']['docs'], function( key, val ) {
		headline = val['headline']['main'];
		url = val['web_url'];
		
		item = "<li class='article'>";
		item += "<a href=" + url + ">" + headline + "</a>";
		item += "</li>";
		$('#nytimes-articles').append(item);
		});
			
	}).error(function() {
		$('#nytimes-header').text('New York Times Articles Could Not Be Loaded');
});
console.log(infoContent);
	// Check to make sure the infowindow is not already opened on this marker.
	if (infowindow.marker != marker) {
	    if (infowindow.marker) { infowindow.marker.setAnimation(null); }
	    /* markers[infowindow.marker.id].setAnimation(null); */
	    marker.setAnimation(google.maps.Animation.BOUNCE);
	    infowindow.marker = marker;
	    infowindow.setContent('<div><h4 id="nytimes-header"></h4><ul id="nytimes-articles" class="article-list"></ul></div>');
	    infowindow.open(map, marker);
	    // Make sure the marker property is cleared if the infowindow is closed.
	    infowindow.addListener('closeclick', function() {
			infowindow.marker = null;
	    });
	} else {
		toggleBounce(marker);
	}
}

function toggleBounce(marker) {
	console.log('I am called');
	if (marker.getAnimation() !== null) {
	  marker.setAnimation(null);
	} else {
	  marker.setAnimation(google.maps.Animation.BOUNCE);
	}
}


function menuIcon(x) {
    x.classList.toggle("change");
    $('.options-box').toggle("change");
}

/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function myFunction() {
    var x = document.getElementById("options-box");
    if (x.className === "options-box") {
        x.className += " responsive";
    } else {
        x.className = "options-box";
    }
}


//////////function bone yard.

// This function will loop through the markers array and display them all.
function showListings(arr) {
console.log('show func');	
console.log(arr);	
	var bounds = new google.maps.LatLngBounds();
	console.log('show');
	console.log(markers[0]);
	// Extend the boundaries of the map for each marker and display the marker
	for (var i = 0; i < markers.length; i++) {
	    markers[i].setMap(map);
		bounds.extend(markers[i].position);
	}
	map.fitBounds(bounds);
}

  // This function will loop through the listings and hide them all.
  function updateListings(arr) {
	console.log('update here');
	console.log(arr[0].id);
	console.log(arr.length);
	console.log(markers[0]);
	console.log(markers[arr[0].id]);
	for (var i = 0; i < markers.length; i++) {
	  markers[i].setMap(null);
	}
	/* for (var i = 0; i < arr.length; i++) {
	  markers[i].setMap(map);
	} */
  }




