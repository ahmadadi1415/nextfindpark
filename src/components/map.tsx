import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function Maps() {
  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} style={{ height: '500px' }}>
      <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[51.505, -0.09]}></Marker>
    </MapContainer>
  );
}

export default Maps;
