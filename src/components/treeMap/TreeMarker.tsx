import { useEffect, useState } from "react";
import { CircleMarker, useMapEvents } from "react-leaflet";
import { Tree, updateCurrentTree } from "../../features/trees/treeSlice";
import { useAppDispatch } from "../../redux/hooks";

function radiusCalculator(zoom: number): number {
  if (zoom < 14) return 0.5;
  if (zoom === 14) return 1;
  if (zoom === 15) return 2;
  if (zoom === 16) return 3;
  if (zoom === 17) return 5;
  if (zoom === 18) return 11;
  return 0;
}
function dashCalculator(zoom: number): number[] {
  if (zoom <= 15) return [0];
  if (zoom === 16) return [6, 6];
  if (zoom === 17) return [8, 8];
  if (zoom === 18) return [12, 12];
  return [];
}
function outerRadiusCalculator(zoom: number): number {
  if (zoom < 14) return 0.5;
  if (zoom === 14) return 1;
  if (zoom === 15) return 4;
  if (zoom === 16) return 8;
  if (zoom === 17) return 15;
  if (zoom === 18) return 22;
  return 0;
}

export function TreeMarker(props: { tree: Tree; zoomLevel: number }) {
  const { tree, zoomLevel } = props;

  const dispatch = useAppDispatch();
  return (
    <CircleMarker
      key={tree.id}
      center={[tree.latitude, tree.longitude]}
      radius={radiusCalculator(zoomLevel)}
      eventHandlers={{
        click: () => {
          dispatch(updateCurrentTree(tree));
        },
      }}
      color={"#008000"}
    />
  );
}

export function SelectedTreeMarker(props: { tree: Tree; zoomLevel: number }) {
  const { tree, zoomLevel } = props;

  const dispatch = useAppDispatch();
  return (
    <>
      <CircleMarker
        key={`${tree.id}-inner`}
        center={[tree.latitude, tree.longitude]}
        radius={radiusCalculator(zoomLevel)}
        eventHandlers={{
          click: () => {
            dispatch(updateCurrentTree(tree));
          },
        }}
        color={"#ebe927"}
      />
      <CircleMarker
        key={`${tree.id}-outer`}
        center={[tree.latitude, tree.longitude]}
        radius={outerRadiusCalculator(zoomLevel)}
        eventHandlers={{
          click: () => {
            dispatch(updateCurrentTree(tree));
          },
        }}
        color={"#ff0000"}
        fillOpacity={0}
        dashArray={dashCalculator(zoomLevel)}
      />
    </>
  );
}
