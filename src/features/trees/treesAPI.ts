import { Tree } from "./treeSlice";

export async function getSampleTrees(): Promise<Tree[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getTrees());
    }, 1000);
  });
}
async function getTrees(): Promise<Tree[]> {
  return fetch("/sampleTrees.json").then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    return res.json();
  });
}
