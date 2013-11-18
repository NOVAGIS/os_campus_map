var map = L.mapbox.map('map').setView([38.73300, -9.16], 15);

// Add layer switcher control to the right of the map to change baselayers.
L.control.layers({
    'Base Map': L.mapbox.tileLayer('rusty.map-ag30cy9j,rusty.isegi_map').addTo(map)},{},{collapsed: false}).addTo(map);


// reference the map-ui area for the layer toggle.
var ui = document.getElementById('map-ui');

/* add layers to the switcher if included */
function addLayer(layer, gridlayer, name, zIndex) {
    layer
        .setZIndex(zIndex)
        .addTo(map);
    gridlayer
        .addTo(map);
    // add the gridControl the active gridlayer
    var gridControl = L.mapbox.gridControl(gridlayer, {follow: true}).addTo(map);
    // Create a simple layer switcher that toggles layers on and off.
    var item = document.createElement('li');
    var link = document.createElement('a');

    link.href = '#';
    link.className = 'active';
    link.innerHTML = name;

    link.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();

        if (map.hasLayer(layer)) {
            map.removeLayer(layer);
            map.removeLayer(gridlayer);
            this.className = '';
        } else {
            map.addLayer(layer);
            map.addLayer(gridlayer);
            this.className = 'active';
        }
    };
    item.appendChild(link);
    ui.appendChild(item);
};

// Add custom popups to each using our custom feature properties
map.markerLayer.on('layeradd', function(e) {
    var marker = e.layer,
        feature = marker.feature;

    // Create custom popup content
    var popupContent =  '<a target="_blank" class="popup" href="' + feature.properties.NAME + '">' +
                        '   <h2>' + feature.properties.NAME + '</h2>' +
                        '</a>';

    // http://leafletjs.com/reference.html#popup
    marker.bindPopup(popupContent,{
        closeButton: false,
        minWidth: 320
    });
});

var config = {
    apiKey: 'SQPOOFZMND44BCXIV2SISOEP1E0A2U0KWD1O5133CWX5Z0PX',
    authUrl: 'https://foursquare.com/',
    apiUrl: 'https://api.foursquare.com/',
	apiSecret: '3HEOHYJZ1Y3WSZDJPC1YRPUNDE2GD5F5BHOHHZ4NQMXMH5ZR'
  };
  
 
  //<![CDATA[
/* Attempt to retrieve access token from URL. 
  function doAuthRedirect() {
    var redirect = window.location.href.replace(window.location.hash, '');
    var url = config.authUrl + 'oauth2/authenticate?response_type=token&client_id=' + config.apiKey +
        '&redirect_uri=' + encodeURIComponent(redirect) +
        '&state=' + encodeURIComponent($.bbq.getState('req') || 'users/self');
    window.location.href = url;
  };

  if ($.bbq.getState('access_token')) {
    // If there is a token in the state, consume it
    var token = $.bbq.getState('access_token');
    $.bbq.pushState({}, 2)
  } else if ($.bbq.getState('error')) {
  } else {
    doAuthRedirect();
  }*/

	// venues/search?ll=38.73,-9.16&categoryId=4d4b7105d754a06374d81259&radius=800
	$.getJSON(config.apiUrl + 'v2/venues/search?v=20131016&ll=38.73,-9.16&categoryId=4d4b7105d754a06374d81259&radius=800&client_id=' + config.apiKey + '&client_secret=' + config.apiSecret, {}, function(data) {
    	venues = data['response']['venues'];
	      /* Place marker for each venue. */
	      for (var i = 0; i < venues.length; i++) {
	        /* Get marker's location */
	        var latLng = new L.LatLng(
	          venues[i]['location']['lat'],
	          venues[i]['location']['lng']
	        );

	         /* Build icon for each icon */
	        var leafletIcon = L.icon({
	          "iconUrl": venues[i]['categories'][0]['icon']['prefix'] + '32' + venues[i]['categories'][0]['icon']['suffix'],
	          "shadowUrl": null,
	          "iconSize": new L.Point(44,51),
	          "iconAnchor": new L.Point(16, 41),
	          "popupAnchor": new L.Point(0, -51),
			  "className": "dot"
	        });
	
   /* content for the popup*/
		var content = '<h1><a href=\"'+ venues[i]['url'] +'\" targer=\"blank\">' + venues[i]['name'] + '<\/a><\/h1>' +
						        '<h2>Score: ' + venues[i]['score'] + '<\/h2>';	
        var marker = new L.Marker(latLng, {icon: leafletIcon})
		
        .bindPopup(content, { closeButton: true })  
        map.addLayer(marker);
		}
    });
  //]]>
  //]]>