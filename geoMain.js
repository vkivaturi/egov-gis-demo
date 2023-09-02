import Municipal_Boundary from '/data/Municipal.json';
import Streams from '/data/Streams1.json';
import Drains from '/data/Drains1.json';
import Testing_Locs from '/data/TestingLocs1.json';
import WaterSheds3 from '/data/Watershed_3_1.json';

var map = L.map('map').setView([12.980676253070413, 77.59432728246767], 12);

var tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
}).addTo(map);

function onEachFeature(feature, layer) {
    var popupContent = 'This is a testing location';

    if (feature.properties && feature.properties.popupContent) {
        popupContent += feature.properties.popupContent;
    }

    layer.bindPopup(popupContent);
}

//Load basic boundary of the municipality
var municipalityLayer = L.geoJSON(Municipal_Boundary, {
    style: function (feature) {
        return { color: "black", weight: 6, fill: false };
    }
}).addTo(map);

var drainsLayer = L.geoJSON(Drains, {
    style: function (feature) {
        return { color: "brown", weight: 1, fill: false };
    }
}).addTo(map);

var streamsLayer = L.geoJSON(Streams, {
    style: function (feature) {
        return { color: "cyan", weight: 1, fill: false };
    }
}).addTo(map);

var shedsLayer = L.geoJSON(WaterSheds3, {
    style: function (feature) {
        return { color: "orange", fill: false, weight: 1 };
    }
}).addTo(map);

var testsLayer = L.geoJSON(Testing_Locs, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, {
            radius: 4,
            fillColor: '#5013ea',
            color: '#000',
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        });
    },
    onEachFeature: onEachFeature
}).addTo(map);

//Bind checkbox click to function
let el1 = document.getElementById('drains');
el1.addEventListener('click', chkClicked);

let el2 = document.getElementById('streams');
el2.addEventListener('click', chkClicked);

let el3 = document.getElementById('sheds');
el3.addEventListener('click', chkClicked);

let el4 = document.getElementById('tests');
el4.addEventListener('click', chkClicked);

let el5 = document.getElementById('satellite');
el5.addEventListener('click', chkClicked);

function chkClicked() {
    var layer = this.id;
    var clicked = document.getElementById(layer);
    if (clicked.checked == true) {
        switch (layer) {
            case "drains":
                drainsLayer.addTo(map);
                break;
            case "streams":
                streamsLayer.addTo(map);
                break;
            case "sheds":
                shedsLayer.addTo(map);
                break;
            case "tests":
                testsLayer.addTo(map);
                break;
            case "satellite":
                satelliteLayer.addTo(map);
                break;
        }
    } else {
        switch (layer) {
            case "drains":
                drainsLayer.remove();
                break;
            case "streams":
                streamsLayer.remove();
                break;
            case "sheds":
                shedsLayer.remove();
                break;
            case "tests":
                testsLayer.remove();
                break;
            case "satellite":
                satelliteLayer.remove();
                break;
        }
    }
}
