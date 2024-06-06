import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import styles from "./TreeMap.module.css";
import { LocatorButton } from "./LocatorButton";
import { SelectedTreeMarker, TreeMarker } from "./TreeMarker";
import LocationMarker from "./LocatorMarker";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  selectTrees,
  selectStatus,
  Tree,
  MapDetails,
  selectMapDetails,
  updateMapRequestTrees,
  selectCurrentTree,
} from "../../features/trees/treeSlice";
import { useMap, useMapEvents } from "react-leaflet";
import { useEffect, useState } from "react";
import { Map } from "leaflet";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { TreeInfo } from "./TreeInfo";

function MapTrees(trees: Tree[], zoomLevel: number) {
  if (trees !== undefined) {
    return trees.map((tree) => {
      return <TreeMarker key={tree.id} zoomLevel={zoomLevel} tree={tree} />;
    });
  }
  return null;
}

function MapSelectedTree(currentTree: Tree, zoomLevel: number) {
  if (currentTree !== undefined) {
    return (
      <SelectedTreeMarker
        key={currentTree.id}
        zoomLevel={zoomLevel}
        tree={currentTree}
      />
    );
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

function SetUpListeners(props: {
  setZoom: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { setZoom } = props;
  const dispatch = useAppDispatch();
  const [mapMoving, setMapMoving] = useState(false);
  const map = useMap();

  useEffect(() => {
    dispatch(updateMapRequestTrees(translateMapDetails(map)));
  }, []);

  useEffect(() => {
    if (!mapMoving) {
      dispatch(updateMapRequestTrees(translateMapDetails(map)));
    }
    // return () => {
    //   dispatch.abort()
    // }
  }, [mapMoving]);

  useMapEvents({
    move() {
      setMapMoving(true);
    },
    moveend(e) {
      setMapMoving(false);
    },
    zoomend() {
      setZoom(map.getZoom());
    },
  });
  return null;
}

function calculateIdealMapHeight(): number {
  if (window.innerWidth <= 400) return Math.round(window.innerHeight * 0.7);
  return Math.round(window.innerHeight * 0.5);
}

export default function TreeMap() {
  const trees = useAppSelector(selectTrees);
  const findingTree = useAppSelector(selectStatus);
  const currentTree = useAppSelector(selectCurrentTree);
  const [zoom, setZoom] = useState(0);

  //Leaflet map requires React.CSSProperties to style
  let mapStyle: React.CSSProperties;
  const customMargin = Math.round(window.innerWidth / 40);
  mapStyle = {
    height: calculateIdealMapHeight(),
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
        <SetUpListeners setZoom={setZoom} />
        <LocationMarker />
        {MapTrees(trees, zoom)}
        {currentTree ? MapSelectedTree(currentTree, zoom) : null}
        <LocatorButton />
      </MapContainer>
      <div>{findingTree}</div>
      <TreeInfo tree={currentTree} />
    </>
  );
}
