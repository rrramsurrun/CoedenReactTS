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
  getTrees,
  Tree,
  getTreesByBounds,
} from "../../features/trees/treeSlice";
import { useMapEvents } from "react-leaflet";

function MapTrees(trees: Tree[]) {
  if (trees.length > 0) {
    return trees.map((tree) => {
      return <TreeMarker tree={tree} />;
    });
  }
  return null;
}

export function loopdeloop(s: string) {
  console.log(s);
}

function SetUpListeners() {
  const dispatch = useAppDispatch();
  const map = useMapEvents({
    moveend(e) {
      dispatch(
        getTreesByBounds([
          map.getBounds().getNorth(),
          map.getBounds().getSouth(),
          map.getBounds().getEast(),
          map.getBounds().getWest(),
        ])
      );
    },
  });
  return null;
}

export default function TreeMap() {
  const trees = useAppSelector(selectTrees);
  const findingTree = useAppSelector(selectStatus);
  const dispatch = useAppDispatch();

  function buttonText() {
    switch (findingTree) {
      case "successful":
        return "Click to find another tree";
      default:
        return "Click to retrieve a tree";
    }
  }
  return (
    <>
      <MapContainer
        className={styles.map}
        center={[51.505, -0.09]}
        zoom={13}
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
      <button
        disabled={findingTree === "loading"}
        onClick={() => dispatch(getTrees())}
      >
        {buttonText()}
      </button>
    </>
  );
}
