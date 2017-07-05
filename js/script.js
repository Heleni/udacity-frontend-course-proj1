console.log('start here');

var locations = [
	  {title: 'Park Ave Penthouse', location: {lat: 40.7713024, lng: -73.9632393}, id: 0},
	  {title: 'Chelsea Loft', location: {lat: 40.7444883, lng: -73.9949465}, id: 1},
	  {title: 'Union Square Open Floor Plan', location: {lat: 40.7347062, lng: -73.9895759}, id: 2},
	  {title: 'East Village Hip Studio', location: {lat: 40.7281777, lng: -73.984377}, id: 3},
	  {title: 'TriBeCa Artsy Bachelor Pad', location: {lat: 40.7195264, lng: -74.0089934}, id: 4},
	  {title: 'Chinatown Homey Space', location: {lat: 40.7180628, lng: -73.9961237}, id: 5}
	];

var map;

// Create a new blank array for all the listing markers.
var markers = [];

var array = new Array(markers.length);
array.fill(0);


var largeInfowindow;

function initMap() {
	// Constructor creates a new map - only center and zoom are required.
console.log('initMap func');
	map = new google.maps.Map(document.getElementById('map'), {
	  center: {lat: 40.7413549, lng: -73.9980244},
	  zoom: 13,
	  mapTypeControl: false
	});

	largeInfowindow = new google.maps.InfoWindow();	

	// The following group uses the location array to create an array of markers on initialize.
	for (var i = 0; i < locations.length; i++) {
	    // Get the position from the location array.
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


function LocationsViewModel() {
console.log('VM func');
    var self = this;

	self.search = ko.observable();

    self.locs = ko.observableArray(markers);

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


var btn = document.getElementById('btn');
btn.addEventListener('click', function(){
	console.log(self.displocs());
	console.log(holder);
});

	/* updateListings(self.displocs()); */

	self.popInfo = function() {
		var marker = markers[this.id];
		populateInfoWindow(marker, largeInfowindow);		
	};


}

ko.applyBindings(new LocationsViewModel());





	/* showListings();	 */
/* markers[0].setMap(map); */
  }


/* function LocationsViewModel() {
console.log('VM func');
    var self = this;

	self.search = ko.observable();

    self.locs = ko.observableArray(locations);

    self.displocs = ko.computed(function(){
		return self.locs().filter(function(loc){
			if(!self.search() || loc.title.toLowerCase().indexOf(self.search().toLowerCase()) != -1) 
				return loc;
		});
	}, this);

	

console.log(self.displocs());
var btn = document.getElementById('btn');
btn.addEventListener('click', function(){
	console.log(self.displocs());
});

	updateListings(self.displocs());

	self.popInfo = function() {
		var marker = markers[this.id];
		populateInfoWindow(marker, largeInfowindow);		
	};


}

ko.applyBindings(new LocationsViewModel()); */
/* ko.applyBindings(new initMap()); */



// This function populates the infowindow when the marker is clicked. We'll only allow
// one infowindow which will open at the marker that is clicked, and populate based
// on that markers position.
function populateInfoWindow(marker, infowindow) {
console.log('pop func');
	ginforwindow = infowindow;
	// Check to make sure the infowindow is not already opened on this marker.
	if (infowindow.marker != marker) {
	    infowindow.marker = null;
	    infowindow.marker = marker;
	    infowindow.setContent('<div>' + marker.position + '</div>');
	    infowindow.open(map, marker);
	    // Make sure the marker property is cleared if the infowindow is closed.
	    infowindow.addListener('closeclick', function() {
			infowindow.marker = null;
	    });
	}
}

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




