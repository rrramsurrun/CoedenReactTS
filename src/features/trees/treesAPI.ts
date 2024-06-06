import { MapAndTreesResponse, MapDetails, Tree } from "./treeSlice";

export async function getSampleTrees(
  mapDetails: MapDetails
): Promise<MapAndTreesResponse> {
  const { north, south, east, west } = mapDetails;
  const baseURL = import.meta.env.PROD
    ? "https://ramsurrun-portfolio.com"
    : "https://localhost:8001";
  const treesDataResponse = await fetch(
    `${baseURL}/trees?N=${north}8&S=${south}&E=${east}&W=${west}`
  );
  return await treesDataResponse.json();
}
