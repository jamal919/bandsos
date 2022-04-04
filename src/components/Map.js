import {
  MapContainer,
  TileLayer,
  LayersControl,
  ScaleControl,
  Marker,
  LayerGroup,
  Popup,
} from "react-leaflet";

import { icon, latLng, latLngBounds } from "leaflet";

import { Navigation } from "./Navigation";

import marker_level from "../images/level.svg";
import bwdb from "../layers/stations/bwdb.json";

const position = [24, 90]; // Bangladesh

var southWest = latLng(11, 50),
  northEast = latLng(28, 120),
  bounds = latLngBounds(southWest, northEast);

const icon_level = icon({
  iconUrl: marker_level,
  iconSize: [24, 24],
});

// Check if an url exists
// async function exists(url) {
//     const result = await fetch(url, { method: 'HEAD' });
//     return result.ok;
//   }

// Main component
function Map(props) {
  return (
    <MapContainer
      center={position}
      bounds={bounds}
      zoom={7}
      scrollWheelZoom={true}
      minZoom={6}
      maxZoom={16}
      style={{ width: "100vw", height: "100vh" }}
    >
      <Navigation></Navigation>
      <LayersControl position="topright">
        <LayersControl.BaseLayer name="OSM - Standard">
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer checked name="ESRI Satellite">
          <TileLayer
            attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
        </LayersControl.BaseLayer>

        <LayersControl.Overlay checked name="BWDB">
          <LayerGroup>
            {bwdb.features.map((station) => (
              <Marker
                position={[
                  station.geometry.coordinates[1],
                  station.geometry.coordinates[0],
                ]}
                icon={icon_level}
              >
                <Popup>
                  Station Name: {station.properties.location} <br />
                  Longitude: {station.properties.x} <br />
                  Latitude: {station.properties.y} <br />
                </Popup>
              </Marker>
            ))}
          </LayerGroup>
        </LayersControl.Overlay>
      </LayersControl>

      <ScaleControl
        position="bottomright"
        metric={true}
        imperial={true}
        maxWidth={200}
      ></ScaleControl>
    </MapContainer>
  );
}

export default Map;
