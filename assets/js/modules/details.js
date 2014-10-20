jQuery(document).ready(function($) {
    // Create map
    getCoordinates($('.map-wrapper').data('address'));
});


function generateMap(coo) {
  var center = new google.maps.LatLng(coo.lat, coo.lng);

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

  // Create circle
  var populationOptions = {
    strokeColor: '#257B6E',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#60bdaf',
    fillOpacity: 0.35,
    map: map,
    center: center,
    radius: 400
  };

  cityCircle = new google.maps.Circle(populationOptions);
}

function getCoordinates(address) {
  // Transform address into coordinates
  $.ajax({
    url: "https://maps.googleapis.com/maps/api/geocode/json",
    data: {
      address: address + ' brussels'
    },
    dataType: 'JSON',
    success: function(res) {
      if(res && res.results[0]) {
        return generateMap(
          res.results[0].geometry.location
        );
      }
    }
  });
}
