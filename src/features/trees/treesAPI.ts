import { MapAndTreesResponse, MapDetails, TreeDetails } from "./treeSlice";
const baseURL = import.meta.env.PROD
  ? "https://ramsurrun-portfolio.com"
  : "https://localhost:8001";
export async function getSampleTrees(
  mapDetails: MapDetails
): Promise<MapAndTreesResponse> {
  const { north, south, east, west } = mapDetails;
  const treesDataResponse = await fetch(
    `${baseURL}/trees?N=${north}8&S=${south}&E=${east}&W=${west}`
  );
  return await treesDataResponse.json();
}

export async function getTreeDetails(
  genus: string,
  species: string
): Promise<TreeDetails> {
  const treesDataResponse = await fetch(
    `${baseURL}/treeDetails?genus=${genus}&species=${encodeURIComponent(
      species
    )}`
  );
  return await treesDataResponse.json();
}
