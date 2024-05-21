import { useState } from "react";
import { useMapEvents } from "react-leaflet/hooks";
import { LatLngExpression } from "leaflet";
import { CircleMarker } from "react-leaflet";

export default function LocationMarker() {
  const [position, setPosition] = useState<LatLngExpression | null>(null);

  const map = useMapEvents({
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <CircleMarker
      center={position}
      radius={5}
      color="#27e2dd"
      fill={true}
      fillOpacity={1}
    />
  );
}
