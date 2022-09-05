import React, { useState, useEffect } from "react";

import Map from "./components/Map";
import BasicNavbar from "./components/Navbar";
import TimeSlider from "./components/TimeSlider";

import config from "./config";

// Stylesheets
import "leaflet/dist/leaflet.css";
import "./App.css";
import { Alert, Container } from "react-bootstrap";

console.debug(config);

// The main application
export default function App() {

  // Forecast date and time selection
  const [selectedforecast, setSelectedForecast] = useState({
    date: config.status.forecast.lastforecast.date,
    cycle: config.status.forecast.lastforecast.cycle,
    url: 'https://raw.githubusercontent.com/jamal919',
    folder: `${config.status.forecast.lastforecast.date.replaceAll("-","")}${config.status.forecast.lastforecast.cycle}`,
    branch: 'main'
  });

  const [forecastLayer, setForecastLayer] = useState({
    available: true,
    folder: selectedforecast.folder
  });

  console.log(forecastLayer);

  const [forecastdata, setForecastData] = useState({});

  // const getForecastData = () => {
  //   fetch(selectedforecast.url + '/' + selectedforecast.folder + '/' + selectedforecast.branch + '/manifest.json')
  //   .then( async response => {
  //     const data = await response.json();

  //     console.log(response);
  //     console.log(data);
      
  //     if (!response.ok) {
  //       const error = (data && data.message) || response.statusText;
  //       return Promise.reject(error);
  //     }

  //     setForecastData({available: true, payload: data});
  //   })
  //   .catch(error => {
  //     setForecastData({errormessage: error.toString()});
  //     console.error('Error loading manifest from ', selectedforecast.url);
  //   });
  // }

  useEffect( () => {
    // Updating manifest for the selected forecast
    fetch(selectedforecast.url + '/' + selectedforecast.folder + '/' + selectedforecast.branch + '/manifest.json')
    .then( async response => {
      const data = await response.json();

      console.log(response);
      console.log("from download Manifest ", data);
      
      if (!response.ok) {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }

      setForecastData({available: true, payload: data});
    })
    .catch(error => {
      setForecastData({errormessage: error.toString()});
      console.error('Error loading manifest from ', selectedforecast.url);
    });

    console.log("ran getForecastData() for ", selectedforecast);
  }, [selectedforecast]);

  return (
    <div id="wrapper">
      <div id="header">
        <BasicNavbar
          sitename={config.sitename}
          navbar={config.navbar}
          forecast={selectedforecast}
          setForecast={setSelectedForecast}
          cycles={config.status.forecast.cycles}
        ></BasicNavbar>
      </div>
      { forecastdata.available
      ? <div id="content">
        <Map
          mapcenter={config.map.mapcenter}
          bounds={config.map.bounds}
          zoom={config.map.zoom}
          minzoom={config.map.minzoom}
          maxzoom={config.map.maxzoom}
          forecast={selectedforecast}
          layer={forecastLayer}
          stations={forecastdata.payload.stations}
        ></Map>
      </div>
      : <Container><Alert className="" variant="danger" key="danger">Forecast for {selectedforecast.date} cycle {selectedforecast.cycle} not available!</Alert></Container>
      }

      { forecastdata.available
        ? <TimeSlider properties={forecastdata.payload.forecast} steps={forecastdata.payload.waterlevels} setForecastLayer={setForecastLayer}></TimeSlider>
        : <Container><Alert className="" variant="danger" key="danger">Forecast for {selectedforecast.date} cycle {selectedforecast.cycle} not available!</Alert></Container>
      }
    </div>
  );
}
