import React from "react";
import Map from "./components/Map";

// Stylesheets
import "leaflet/dist/leaflet.css";

// The main application
export default function App() {
  return (
    <div className="map_container">
      <Map></Map>
    </div>
  );
}
