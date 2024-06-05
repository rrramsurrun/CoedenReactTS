import { MapAndTreesResponse, MapDetails, Tree } from "./treeSlice";

export async function getSampleTrees(
  mapDetails: MapDetails
): Promise<MapAndTreesResponse> {
  const { north, south, east, west } = mapDetails;
  const treesDataResponse = await fetch(
    `https://localhost:8001/trees?N=${north}8&S=${south}&E=${east}&W=${west}`
  );
  return await treesDataResponse.json();
}
