import { createAppSlice } from "../../redux/createAppSlice";
import { RootState } from "../../redux/store";
import { getSampleTrees } from "./treesAPI";

export type Tree = {
  id: string;
  borough: string;
  treeName: string;
  taxonName: string;
  commonName: string;
  genus: string;
  longitude: number;
  latitude: number;
};

export type MapDetails = {
  north: number;
  east: number;
  south: number;
  west: number;
  zoom: number;
  centerLat: number;
  centerLng: number;
};

export type MapAndTreesResponse = {
  mapDetails: MapDetails;
  trees: Tree[];
};

export type TreeSliceState = {
  trees: Tree[];
  requestStatus:
    | "idle"
    | "Retrieving Trees"
    | "Failed to load Trees"
    | "Trees Loaded";
  error: string;
  mapDetails: MapDetails | undefined;
  currentTree: Tree | undefined;
};

const initialState: TreeSliceState = {
  trees: [],
  requestStatus: "idle",
  error: "",
  mapDetails: undefined,
  currentTree: undefined,
};

function requireNewTrees(oldBounds: MapDetails, newBounds: MapDetails) {
  //Only change is increased zoom
  if (
    oldBounds.centerLat === newBounds.centerLat &&
    oldBounds.centerLng === newBounds.centerLng &&
    newBounds.zoom > oldBounds.zoom
  )
    return false;

  return true;
}

async function getTreesNew(
  oldBounds: MapDetails | undefined,
  newBounds: MapDetails,
  oldtrees: Tree[]
): Promise<MapAndTreesResponse> {
  if (oldBounds === undefined) {
    //first run
    return getSampleTrees(newBounds);
  } else if (requireNewTrees(oldBounds, newBounds)) {
    return getSampleTrees(newBounds);
  }
  //return a promise containing the old trees
  return new Promise((resolve) => {
    resolve({ trees: oldtrees, mapDetails: newBounds });
  });
}

export const treeSlice = createAppSlice({
  name: "tree",
  initialState,
  reducers: (create) => ({
    updateMapRequestTrees: create.asyncThunk(
      async (mapDetails: MapDetails, thunkAPI) => {
        const state = thunkAPI.getState() as RootState;
        const mapAndTrees = await getTreesNew(
          state.tree.mapDetails,
          mapDetails,
          state.tree.trees
        );
        return mapAndTrees;
      },
      {
        pending: (state) => {
          state.requestStatus = "Retrieving Trees";
        },
        fulfilled: (state, action) => {
          state.requestStatus = "Trees Loaded";
          state.trees = action.payload.trees;
          state.mapDetails = action.payload.mapDetails;
        },
        rejected: (state) => {
          state.requestStatus = "Failed to load Trees";
        },
      }
    ),
    updateCurrentTree: create.reducer<Tree>((state, action) => {
      state.currentTree = action.payload;
    }),
  }),
  selectors: {
    selectMapDetails: (state) => state.mapDetails,
    selectTrees: (state) => state.trees,
    selectStatus: (state) => state.requestStatus,
    selectCurrentTree: (state) => state.currentTree,
  },
});

export const { updateMapRequestTrees, updateCurrentTree } = treeSlice.actions;

export const {
  selectMapDetails,
  selectTrees,
  selectStatus,
  selectCurrentTree,
} = treeSlice.selectors;
