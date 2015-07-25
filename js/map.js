var map = L.map('map', {
  minZoom: 17,
  maxZoom: 20
});

L.tileLayer(baseUrl + '/tiles/{z}/{x}/{y}.png', {
  tms: true,
  maxZoom: 20,
  bounds: [
    [40.7352974, -74.0119905],
    [40.7418289, -74.0048389]
  ]
}).addTo(map);

map.setView([40.73795,-74.00790], 18);

var addressStyle = {
  radius: 5,
  fillColor: "#ffd400",
  color: "#000",
  weight: 1,
  fillOpacity: 0.8
};

var streetStyle = {
  color: "#000",
  weight: 1
};

var geojsonLayers = [
  {
    url: 'data/addresses.geojson',
    options: {
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, addressStyle);
      }
    }
  },
  {
    url: 'data/west_village_centerlines.geojson',
    options: {
      style: streetStyle
    }
  },
  {
    url: 'results/results.geojson',
    options: {}
  }
];

geojsonLayers.forEach(function(layer) {
  d3.json(baseUrl + '/' + layer.url, function(json) {
    L.geoJson(json, layer.options).addTo(map);
  });
});
