import { useEffect, useState } from "react";
import { CircleMarker, useMapEvents } from "react-leaflet";
import { Tree } from "../../features/trees/treeSlice";

function radiusCalculator(zoom: number): number {
  if (zoom < 14) return 2;
  if (zoom === 14) return 3;
  if (zoom === 15) return 5;
  if (zoom === 16) return 7;
  if (zoom === 17) return 9;
  if (zoom === 18) return 11;
  return 0;
}

export function TreeMarker(props: { tree: Tree }) {
  const { tree } = props;
  //Set radius based on zoom
  const [radius, setRadius] = useState(0);
  const [zoom, setZoom] = useState(0);

  useEffect(() => {
    setRadius(radiusCalculator(zoom));
  }, [zoom]);

  const map = useMapEvents({
    zoomend() {
      setZoom(map.getZoom());
    },
  });

  if (zoom < 14) return <></>;
  return (
    <CircleMarker
      key={tree.id}
      center={[tree.latitude, tree.longitude]}
      radius={radius}
      eventHandlers={{ click: () => console.log("You clicked a marker") }}
    />
  );
}
