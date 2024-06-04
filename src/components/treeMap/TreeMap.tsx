import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import styles from "./TreeMap.module.css";
import { LocatorButton } from "./LocatorButton";
import { TreeMarker } from "./TreeMarker";
import LocationMarker from "./LocatorMarker";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  selectTrees,
  selectStatus,
  Tree,
  MapDetails,
  selectMapDetails,
  updateMapRequestTrees,
} from "../../features/trees/treeSlice";
import { useMap, useMapEvents } from "react-leaflet";
import { useEffect } from "react";
import { Map } from "leaflet";
// import

function MapTrees(trees: Tree[]) {
  if (trees !== undefined) {
    return trees.map((tree) => {
      return <TreeMarker key={tree.id} tree={tree} />;
    });
  }
  return null;
}

function translateMapDetails(map: Map): MapDetails {
  return {
    north: map.getBounds().getNorth(),
    east: map.getBounds().getEast(),
    south: map.getBounds().getSouth(),
    west: map.getBounds().getWest(),
    zoom: map.getZoom(),
    centerLat: map.getCenter().lat,
    centerLng: map.getCenter().lng,
  };
}

function SetUpListeners() {
  const dispatch = useAppDispatch();
  const map = useMap();

  useEffect(() => {
    dispatch(updateMapRequestTrees(translateMapDetails(map)));
  }, []);

  useMapEvents({
    moveend(e) {
      dispatch(updateMapRequestTrees(translateMapDetails(map)));
    },
  });
  return null;
}

export default function TreeMap() {
  const trees = useAppSelector(selectTrees);
  const findingTree = useAppSelector(selectStatus);
  const currentDetails = useAppSelector(selectMapDetails);

  //Leaflet map requires React.CSSProperties to style
  let mapStyle: React.CSSProperties;
  const customMargin = Math.round(window.innerWidth / 40);
  mapStyle = {
    height: Math.round(window.innerHeight / 2),
    marginTop: customMargin,
    marginLeft: customMargin,
    marginRight: customMargin,
  };

  return (
    <>
      <MapContainer
        style={mapStyle}
        center={[51.505, -0.09]}
        zoom={16}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <SetUpListeners />
        <LocationMarker />
        {MapTrees(trees)}
        <LocatorButton />
      </MapContainer>
      <div>{findingTree}</div>
      <div>{currentDetails?.centerLat}</div>
      <div>{currentDetails?.zoom}</div>
    </>
  );
}
