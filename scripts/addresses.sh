#!/bin/bash

read -r -d '' JQ << EOM
  {
    type: "FeatureCollection",
    features: [.[] | {
      type: "Feature",
      properties: {
        id: .id,
        address: .addresses[0].address
      },
      geometry: {
        type: "Point",
        coordinates: [
          .addresses[0].longitude,
          .addresses[0].latitude
        ]
      }
    }]
  }
EOM

cat data/addresses.json | jq "$JQ" > data/addresses.geojson
