import { MapAndTreesResponse, MapDetails, Tree } from "./treeSlice";

export async function getSampleTrees(
  mapDetails: MapDetails
): Promise<MapAndTreesResponse> {
  return new Promise((resolve) => {
    setTimeout(async function () {
      const trees = await getTrees();
      resolve({ trees: trees, mapDetails: mapDetails });
    }, 100);
  });
}
async function getTrees(): Promise<Tree[]> {
  return fetch("/sampleTrees.json").then((res) => {
    if (!res.ok) {
      throw new Error(`Error parsing JSON! Error: ${res.status}`);
    }

    return res.json();
  });
}
