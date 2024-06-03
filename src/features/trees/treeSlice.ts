import { createAppSlice } from "../../redux/createAppSlice";
import { RootState } from "../../redux/store";
import { getSampleTrees } from "./treesAPI";

export type Tree = {
  id: number;
  borough: string;
  tree_name: string;
  taxon_name: string;
  common_name: string;
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
  requestStatus: "idle" | "loading" | "failed" | "successful";
  error: string;
  mapDetails: MapDetails | undefined;
};

const initialState: TreeSliceState = {
  trees: [],
  requestStatus: "idle",
  error: "",
  mapDetails: undefined,
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

function getTreesNew(
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
          state.requestStatus = "loading";
        },
        fulfilled: (state, action) => {
          state.requestStatus = "successful";
          state.trees = action.payload.trees;
          state.mapDetails = action.payload.mapDetails;
        },
        rejected: (state) => {
          state.requestStatus = "failed";
        },
      }
    ),
  }),
  selectors: {
    selectMapDetails: (state) => state.mapDetails,
    selectTrees: (state) => state.trees,
    selectStatus: (state) => state.requestStatus,
  },
});

export const { updateMapRequestTrees } = treeSlice.actions;

export const { selectMapDetails, selectTrees, selectStatus } =
  treeSlice.selectors;
