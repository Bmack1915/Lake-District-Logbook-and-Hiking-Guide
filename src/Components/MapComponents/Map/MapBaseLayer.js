import { LayersControl, TileLayer } from "react-leaflet";
const { BaseLayer } = LayersControl;
//Tile packages to offer use different map types, i.e. topographic, satellite
function MapBaseLayer() {
  return (
    <div>
      <LayersControl position="topright">
        <BaseLayer checked name="OpenStreetMap">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
        </BaseLayer>
        <BaseLayer name="Satellite">
          <TileLayer
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
        </BaseLayer>
        <BaseLayer name="Topographic">
          <TileLayer
            url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
            maxZoom={17}
            attribution='Map data: &copy; <a href="https://www.opentopomap.org">OpenTopoMap</a> contributors'
          />
        </BaseLayer>
      </LayersControl>
    </div>
  );
}

export default MapBaseLayer;
