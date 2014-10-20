jQuery(document).ready(function($) {
    // Create map
    generateMap($('.map-wrapper').data('address'));
});


function generateMap(address) {
  if(address) {
    $.ajax({
      url: "https://maps.googleapis.com/maps/api/geocode/json",
      data: {
        address: address + ' brussels'
      },
      dataType: 'JSON',
      success: function(res) {
        if(res && res.results[0]) {
          return initializeMap(
            res.results[0].geometry.location
          );
        }
      }
    });
  } else {
    initializeMap();
  }
};

function initializeMap(coo) {
  var coordinates = coo || {
    lat: 50.8503396,
    lng: 4.3517103
  };

  var center = new google.maps.LatLng(coordinates.lat, coordinates.lng);

  // create map
  var mapOptions = {
    center: center,
    zoom: 14,
    scrollwheel: false,
    zoomControl: true,
    disableDefaultUI: true
  };

  var map = new google.maps.Map(document.getElementById("map-canvas"),
      mapOptions);

  if(coo) {
    // Create circle
    new google.maps.Circle({
      strokeColor: '#257B6E',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#60bdaf',
      fillOpacity: 0.35,
      map: map,
      center: center,
      radius: 400
    });
  }
};
