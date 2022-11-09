var map = L.map('map').setView([47.25, -122.44], 11);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/256/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: mapbox://styles/mapbox/navigation-day-v1,
    accessToken: 'pk.eyJ1IjoiYWpsZW9uMTgwIiwiYSI6ImNsYTQ4ZDVqcTA5cHYzd21seGszbWI3eDIifQ.yaXUrccsnQ_RHZqxu7UKNw',
}).addTo(map);

var control = L.Routing.control({
    waypoints: [
        null,
        //L.latLng(47.246587, -122.438830),
        //L.latLng(47.318017, -122.542970)
    ],
    routeWhileDragging: true,
    router: L.Routing.mapbox('pk.eyJ1IjoiYWpsZW9uMTgwIiwiYSI6ImNsYTQ4ZDVqcTA5cHYzd21seGszbWI3eDIifQ.yaXUrccsnQ_RHZqxu7UKNw'),
    units: 'imperial',
    collapsible: true,
    show: false,
    geocoder: L.Control.Geocoder.photon(),
}).addTo(map);

function createButton(label, container) {
    var btn = L.DomUtil.create('button', '', container);
    btn.setAttribute('type', 'button');
    btn.innerHTML = label;
    return btn;
}

map.on('click', function(e) {
    var container = L.DomUtil.create('div'),
        startBtn = createButton('Start from this location', container),
        destBtn = createButton('Go to this location', container);

        L.popup()
        .setContent(container)
        .setLatLng(e.latlng)
        .openOn(map);  
    
    L.DomEvent.on(startBtn, 'click', function() {
        control.spliceWaypoints(0, 1, e.latlng);
        map.closePopup();
    });  
    
    L.DomEvent.on(destBtn, 'click', function() {
        control.spliceWaypoints(control.getWaypoints().length - 1, 1, e.latlng);
        control.show();
        map.closePopup();
    });

    L.DomEvent.on(destBtn, 'click', function() {
        control.spliceWaypoints(control.getWaypoints().length - 1, 1, e.latlng);
        control.show();
        map.closePopup();
    });
 });
 L.Control.textbox = L.Control.extend({
    onAdd: function(map) {    
        var text = L.DomUtil.create('div', 'instructions');
        text.id = "info_text";
        text.innerHTML = "This map provides routing between a starting point and a destination point. </br>To select a starting point and a destination point: </br>1. Click on the map where you want to start. </br>2. click on 'Start from this location.' </br>3. Click where you want to finish. </br>4. Click on 'Go to this location.'"
        return text;
    },

    onRemove: function(map) {},

}); 

L.control.textbox = function(opts) { return new L.Control.textbox(opts);}
L.control.textbox({ position: 'bottomleft' }).addTo(map);
