import "./danger.css";

import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

export default function Danger(props) {
  const customIcon = new Icon({
    iconUrl: require("./icon.png"),
    iconSize: [38, 38],
  });
  return (
    <div className="danger-main">
      <nav>Panic</nav>
      <h3>
        La persona está en la latitud: {props.lati} y longitud:{props.longi}
      </h3>
      <div className="alert-danger">
        <h2 className="h2-alert">ALERTA</h2>
        <div className="map-container">
          <MapContainer
            center={[props.lati, props.longi]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              position={[props.lati, props.longi]}
              icon={customIcon}
            ></Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
}
