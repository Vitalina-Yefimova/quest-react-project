import { Map, Marker } from "@vis.gl/react-google-maps";

const GoogleMap: React.FC = () => {
  const center = {
    lat: 51.045190861031465, // широта
    lng: -114.05957001271959, // долгота
  };

  return (
    <div className="w-[649px] h-[336px] mt-[47px]">
      <Map defaultCenter={center} defaultZoom={14} className="w-full h-full">
        <Marker
          position={center}
          icon={{
            url: "/location-map-icon.svg",
            scaledSize: { width: 47.5, height: 61 },
          }}
        />
      </Map>
    </div>
  );
};

export default GoogleMap;
