var map = L.mapbox.map('map').setView([38.73300, -9.16], 17);

// Add layer switcher control to the right of the map to change baselayers.
L.control.layers({
    'Base Map': L.mapbox.tileLayer('rusty.map-ag30cy9j').addTo(map),
    'Aerial Map': L.mapbox.tileLayer('rusty.map-xq326six')
},{},{collapsed: false}).addTo(map);


var markerLayer1 = L.mapbox.markerLayer().loadURL('../geojson/facilities.geojson');
var markerLayer2 = L.mapbox.markerLayer().loadURL('../geojson/transport.geojson');
// reference the map-ui area for the layer toggle.
var ui = document.getElementById('map-ui');


// add layers for the switcher
addLayer(L.mapbox.tileLayer('rusty.isegi_map'), L.mapbox.gridLayer('rusty.isegi_map'),'UNL Buildings', 4);
//addLayer(L.mapbox.tileLayer('rusty.isegi_facilities_labels'), L.mapbox.gridLayer('rusty.isegi_facilities_labels'),'UNL Facilities', 5);
addLayer(markerLayer2, markerLayer2,'Transport Options', 6);
addLayer(markerLayer1, markerLayer1, 'UNL Facilities', 7);


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
markerLayer1.on('layeradd', function(e) {
    var marker = e.layer,
        feature = marker.feature;

    // Create custom popup content
    var popupContent =  '<h1 style="line-height:0;margin-bottom:0;">' + feature.properties.name + '</h1>' +
                        '<p>'+ feature.properties.OWNER +'</p>';

    // http://leafletjs.com/reference.html#popup
    marker.bindPopup(popupContent,{
        closeButton: true,
        minWidth: 100
    });
	// display a list of markers.
//	document.getElementById('onscreen').innerHTML = popupContent;
});

// Add custom popups to each using our custom feature properties
markerLayer2.on('layeradd', function(e) {
    var marker = e.layer,
        feature = marker.feature;

    // Create custom popup content
    var popupContent =  '<h1 class="title">' + feature.properties.Transpor + ' ' + feature.properties.Disc + '</h1><span>This stops is <strong>'+ feature.properties.Distance +'</strong> meters from the nearest UNL entrance.</span><h2>Timetable Information</h2><div class="direction"><a target="_blank"  href="' + feature.properties.first_url + '">Direction of ' + feature.properties.first_direct + '</a></div> <div class="direction"><a target="_blank"  href="' + feature.properties.second_url + '">Direction of ' + feature.properties.second_direct + '</a></div> <div class="source">' + feature.properties.Disc + '</div>';



    // http://leafletjs.com/reference.html#popup
    marker.bindPopup(popupContent,{
        closeButton: true,
        minWidth: 320
    });
});

$('#search').keyup(search);
// search functionality for the 
function search() {
    // get the value of the search input field
    var searchString = $('#search').val().toLowerCase();

    markerLayer1.setFilter(showType);

    // here we're simply comparing the 'name' property of each marker
    // to the search string, seeing whether the former contains the latter.
    function showType(feature) {
        return feature.properties.name
            .toLowerCase()
            .indexOf(searchString) !== -1;
    }
}
