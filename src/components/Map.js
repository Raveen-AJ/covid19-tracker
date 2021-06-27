import { useRef, useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import classes from "./Map.module.css";
import mapboxgl from "mapbox-gl";
import countries from "../assets/countries.json";
import { useContext } from "react";
import SearchContext from "../store/search-context";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_PUBLIC;
let map;

const Map = () => {
  const location = useContext(SearchContext).location;

  const mapContainer = useRef(null);
  const [covidData, setCovidData] = useState(null);

  if (map) {
    map.flyTo({
      center: [location.lng, location.lat],
      zoom: location.zoom,
    });
  }

  useEffect(() => {
    if (covidData && !map) {
      map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/raveenj/ckqab64xk0o0t17qoqk83yn1d",
        center: [16, 27],
        zoom: 1,
      });

      map.addControl(new mapboxgl.NavigationControl());

      map.once("load", function () {
        map.addSource("countries", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: covidData,
          },
        });

        map.addLayer({
          id: "countries_fill",
          source: "countries", // this should be the id of source
          type: "fill",
          paint: {
            "fill-opacity": 0.5,
            "fill-color": [
              "interpolate",
              ["linear"],
              ["get", "deaths"],
              0,
              "#66FF00",
              1000,
              "#99AA00",
              2000,
              "#AA8E00",
              5000,
              "#BB7100",
              10000,
              "#CC5500",
              20000,
              "#DD3900",
              50000,
              "#EE1C00",
              100000,
              "#FF0000",
            ],
          },
        });

        let lastId;

        const popup = new mapboxgl.Popup({
          closeButton: true,
          closeOnClick: false,
        });

        popup.on("close", function () {
          lastId = undefined;
          map.getCanvas().style.cursor = "";
        });

        map.on("click", "countries_fill", (e) => {
          const country_info = JSON.parse(e.features[0].properties.countryInfo);
          const id = country_info._id;
          if (id !== lastId) {
            lastId = id;

            const {
              country,
              todayCases,
              todayDeaths,
              todayRecovered,
              cases,
              deaths,
              recovered,
              updated,
            } = e.features[0].properties;

            // Change the pointer type on mouseenter
            map.getCanvas().style.cursor = "pointer";
            const coordinates = Object.values(e.lngLat);
            const countryISO = country_info.iso2;

            const HTML = `<p>Country: <b>${country}</b></p>
                <p>Today Cases: <b>${todayCases}</b></p>
                <p>Total Cases: <b>${cases}</b></p>
                <p>Today Deaths: <b>${todayDeaths}</b></p>
                <p>Total Deaths: <b>${deaths}</b></p>
                <p>Today Recovered: <b>${todayRecovered}</b></p>
                <p>Total Recovered: <b>${recovered}</b></p>
                <img src="https://www.countryflags.io/${countryISO}/flat/64.png" alt="Flag"></img>
                ${new Date(updated).toLocaleString()}`;

            popup.setLngLat(coordinates).setHTML(HTML).addTo(map);
          }
        });
      });
    }

    return () => {
      map = undefined;
    };
  }, [covidData]);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/countries").then((response) => {
      response.json().then((data) => {
        setCovidData(
          data.map((country) => {
            const modified_data = {
              type: "Feature",
              properties: country,
            };

            countries.features.forEach((c) => {
              if (c.properties.ISO_A3 === country.countryInfo.iso3) {
                modified_data["geometry"] = c.geometry;
              }
            });

            return modified_data;
          })
        );
      });
    });
  }, []);

  return (
    <div>
      <div ref={mapContainer} className={classes["map-container"]}></div>
    </div>
  );
};

export default Map;
