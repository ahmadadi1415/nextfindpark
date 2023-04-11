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
import "leaflet-defaulticon-compatibility";
import { LatLng } from "leaflet";

const MapsInput = ({onChange}: any) => {
  const [position, setPosition] = useState<any>([-7.963269837489233, 112.61951416893771])
  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker: any = markerRef.current;
        if (marker != null) {
          const {lat, lng} = marker.getLatLng()
          setPosition([lat, lng])
          // console.log(position)
          // console.log(marker.getLatLng())
          onChange(marker.getLatLng())
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
      zoom={50}
      scrollWheelZoom={true}
      style={{ height: "500px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        eventHandlers={eventHandlers}
        position={position}
        draggable={true}
        autoPan={true}
        
        ref={markerRef}
      >
        <Popup>Lahan parkir yang dipilih</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapsInput;
