import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css"; // Re-uses images from ~leaflet package
import * as L from "leaflet";
import "leaflet-defaulticon-compatibility";

const MapsInput = () => {
  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          // setPosition(marker.getLatLng())
          console.log(marker.getLatLng());
        }
      },
    }),
    []
  );
  useEffect(() => {
    console.log(markerRef.current);
  }, [markerRef.current]);
  return (
    <MapContainer
      center={[-7.963269837489233, 112.61951416893771]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "500px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        eventHandlers={eventHandlers}
        position={[-7.963269837489233, 112.61951416893771]}
        draggable={true}
        animate={true}
        ref={markerRef}
      >
        <Popup>Hey ! I live here</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapsInput;
