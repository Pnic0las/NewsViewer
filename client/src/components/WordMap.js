import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const markers = [
  {
    markerOffset: -30,
    name: "Emirats arabes unis",
    code: "ae",
    coordinates: [54.136302947998026, 23.768651303959444]
  },
  {
    markerOffset: -30,
    name: "Argentine",
    code: "ar",
    coordinates: [-64.9672817, -34.9964963]
  },
  {
    markerOffset: -30,
    name: "Autriche",
    code: "at",
    coordinates: [13.199959, 47.2000338]
  },
  {
    markerOffset: -30,
    name: "Australie",
    code: "au",
    coordinates: [134.755, -24.7761086]
  },
  {
    markerOffset: -30,
    name: "Belgique",
    code: "be",
    coordinates: [4.6667145, 50.6402809]
  },
  {
    markerOffset: -30,
    name: "Bulgarie",
    code: "bg",
    coordinates: [25.4856617, 42.6073975]
  },
  {
    markerOffset: -30,
    name: "Brésil",
    code: "br",
    coordinates: [-53.2, -10.3333333]
  },
  {
    markerOffset: -30,
    name: "Canada",
    code: "ca",
    coordinates: [-107.9917071, 61.0666922]
  },
  {
    markerOffset: -30,
    name: "Suisse",
    code: "ch",
    coordinates: [8.2319736, 46.7985624]
  },
  {
    markerOffset: -30,
    name: "France",
    code: "fr",
    coordinates: [2.7746185575557236, 46.33256086952046]
  },
  {
    markerOffset: -30,
    name: "Japon",
    code: "jp",
    coordinates: [139.2394179, 36.5748441]
  },
  {
    markerOffset: -30,
    name: "Russie",
    code: "ru",
    coordinates: [97.7453061, 64.6863136]
  },
  {
    markerOffset: -30,
    name: "Etats-Unis",
    code: "us",
    coordinates: [-100.96549432232572, 39.86796058822607]
  },
  {
    markerOffset: -30,
    name: "Afrique du Sud",
    code: "za",
    coordinates: [24.193743672271463, -30.615258689663023]
  },

]


const MapChart = ({ bool, setcode }) => {

  const Test = (code) => {
    setcode(code);
    bool(false);

  }

  return (
    <div>
      <ComposableMap>
        <ZoomableGroup zoom={1}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => (
                <Geography key={geo.rsmKey} geography={geo} />
              ))
            }
          </Geographies>

          {markers.map(({ name, coordinates, markerOffset, code }) => (
            <Marker key={name} coordinates={coordinates} onClick={() => Test(code)}>
              <g
                fill="none"
                stroke="#FF5533"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                transform="translate(-12, -24)"
              >
                <circle cx="12" cy="10" r="3" />
                <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
              </g>
              <text
                textAnchor="middle"
                y={markerOffset}
                style={{ fontFamily: "system-ui", fill: "#5D5A6D", color: "white" }}
              >
                {name}
              </text>
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default MapChart;