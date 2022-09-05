import React, {useEffect, useRef} from 'react';
import {
  MapContainer,
  TileLayer,
  LayersControl,
  ScaleControl,
  Marker,
  LayerGroup,
  Popup,
  Tooltip
} from "react-leaflet";

import { icon, latLng, latLngBounds } from "leaflet";
import DyGraph from "./Graph";
import Colorbar from './Colorbar';

import wlfile from "../assets/timeseries/hironpoint.csv";

import marker_level from "../assets/icons/level.svg";

const icon_level = icon({
  iconUrl: marker_level,
  iconSize: [24, 24],
});

// Main component
function Map(props) {

  const ref = useRef(null);

  const layerurl = props.forecast.url + '/' + props.forecast.folder + '/' + props.forecast.branch + '/' + props.layer.folder + "/{z}/{x}/{y}.png";

  useEffect(() => {
    if (ref.current) {
      ref.current.setUrl(layerurl);
    }
  }, [layerurl]);

  return (
    <MapContainer
      key={props.forecast.date + props.forecast.cycle}
      center={props.mapcenter}
      bounds={latLngBounds(latLng(props.bounds.south, props.bounds.west), latLng(props.bounds.north, props.bounds.east))}
      zoom={props.zoom}
      scrollWheelZoom={true}
      minZoom={props.minzoom}
      maxZoom={props.maxzoom}
      style={{ width: "100vw", height: "100%"}}
    >
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="OSM - Standard">
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            zIndex={1}
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name="ESRI Satellite">
          <TileLayer
            attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            zIndex={1}
          />
        </LayersControl.BaseLayer>

        <LayersControl.Overlay checked name="Station Forecast">
          <LayerGroup>
            {props.stations.map((station) => (
              <Marker
                key={station.ID}
                position={[
                  station.Lat,
                  station.Lon,
                ]}
                icon={icon_level}
              >
                <Popup maxWidth={"80%"}>
                  <Tooltip>
                  Station ID: {station.ID} <br />
                  Station Name: {station.Name} <br />
                  Longitude: {station.Lon} <br />
                  Latitude: {station.Lat} <br />
                  </Tooltip>
                  
                  <DyGraph
                    url={wlfile}
                    title={station.Name}
                    />

                </Popup>
              </Marker>
            ))}
          </LayerGroup>
        </LayersControl.Overlay>

      </LayersControl>https://medium.com/@benlmsc/stop-using-console-log-d281a900dedb

      {
        props.layer.available &&
        <>
          <TileLayer
            url={layerurl}
            tms={true}
            opacity={0.9}
            zIndex={10}
            ref={ref}
          />
          <Colorbar position="bottomright" colorbar="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQdVtc7ruP8W6UQ28UbYUwdU9SWbz4tD6ZEeGu68mk5L6R2T4sK4z-8tp1WS8Z0oSKEw&usqp=CAU"></Colorbar>
        </>
      }
      
      <ScaleControl
        position="bottomleft"
        metric={true}
        imperial={true}
        maxWidth={200}
      ></ScaleControl>
    </MapContainer>
  );
}

export default Map;
