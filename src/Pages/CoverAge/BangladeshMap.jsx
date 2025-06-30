import React, { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

//Custom hook component to fly to first search result
const FlyToDistrict = ({ district, search }) => {
  const map = useMap();

  useEffect(() => {
    if (district && search?.trim().length > 0) {
      map.flyTo([district.latitude, district.longitude], 10, {
        duration: 1.5,
      });
    }
  }, [district, search, map]);
  return null;
};
const BangladeshMap = ({ districtData, filteredDistricts, search }) => {
  // Get the first matched district from search result
  const firstMatch =
    filteredDistricts && filteredDistricts.length > 0
      ? filteredDistricts[0]
      : null;

  return (
    <div>
      <div className="h-[500px] w-full rounded-lg overflow-hidden shadow-md">
        <MapContainer
          center={[23.685, 90.3563]}
          zoom={7}
          scrollWheelZoom={true}
          className="h-full w-full z-0"
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/*  Automatically fly to the first matched district */}
          {firstMatch && (
            <FlyToDistrict district={firstMatch} search={search} />
          )}

          {districtData?.map((district, idx) => (
            <Marker
              key={idx}
              position={[district.latitude, district.longitude]}
            >
              <Popup>
                <strong>{district.district}</strong>
                <br />
                <span className="text-sm">City: {district.city}</span>
                <br />
                <span className="text-sm">
                  Covered: {district.covered_area.join(", ")}
                </span>
                <br />
                <a
                  href={district.flowchart}
                  target="_blank"
                  className="text-blue-500 underline text-xs"
                >
                  View Delivery Flowchart
                </a>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default BangladeshMap;
