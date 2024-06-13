import { createAppSlice } from "../../redux/createAppSlice";
import { RootState } from "../../redux/store";
import { getSampleTrees, getTreeDetails } from "./treesAPI";

export type Tree = {
  id: string;
  borough: string;
  treeName: string;
  taxon: string;
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

export type Genus = {
  genusName: string;
  description: string;
};
export type Species = {
  speciesName: string;
  description: string;
  images: string;
};

export type TreeDetails = {
  genus: Genus | null;
  species: Species | null;
};

export type requestStatus = "IDLE" | "FETCHING" | "FAILED" | "SUCCESS";

export type TreeSliceState = {
  trees: Tree[];
  treesStatus:
    | "idle"
    | "Retrieving Trees"
    | "Failed to load Trees"
    | "Trees Loaded";
  error: string;
  mapDetails: MapDetails | undefined;
  currentTree: Tree | undefined;
  treeDetailsStatus: requestStatus;
  treeDetails: TreeDetails | undefined;
  genera: { [genusName: string]: Genus | null };
  species: { [speciesName: string]: Species | null };
};

const initialState: TreeSliceState = {
  trees: [],
  treesStatus: "idle",
  error: "",
  mapDetails: undefined,
  currentTree: undefined,
  treeDetailsStatus: "IDLE",
  treeDetails: undefined,
  genera: {},
  species: {},
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
          state.treesStatus = "Retrieving Trees";
        },
        fulfilled: (state, action) => {
          state.treesStatus = "Trees Loaded";
          state.trees = action.payload.trees;
          state.mapDetails = action.payload.mapDetails;
        },
        rejected: (state) => {
          state.treesStatus = "Failed to load Trees";
        },
      }
    ),
    updateCurrentTree: create.reducer<Tree>((state, action) => {
      state.currentTree = action.payload;
    }),
    requestTreeDetails: create.asyncThunk(
      async (tree: Tree, thunkAPI) => {
        const state = thunkAPI.getState() as RootState;
        var treeDetails: TreeDetails;
        if (
          //check cache
          tree.genus in state.tree.genera &&
          tree.taxon in state.tree.species
        ) {
          treeDetails = {
            genus: state.tree.genera[tree.genus],
            species: state.tree.species[tree.taxon],
          };
        } else {
          //request information
          treeDetails = await getTreeDetails(tree.genus, tree.taxon);
        }
        return { treeDetails, tree };
      },
      {
        pending: (state) => {
          state.treeDetailsStatus = "FETCHING";
        },
        fulfilled: (state, action) => {
          state.treeDetailsStatus = "SUCCESS";
          state.treeDetails = action.payload.treeDetails;
          //Store genus and species in dictionary
          state.genera[action.payload.tree.genus] =
            action.payload.treeDetails.genus;
          state.species[action.payload.tree.taxon] =
            action.payload.treeDetails.species;
        },
        rejected: (state) => {
          state.treeDetailsStatus = "FAILED";
        },
      }
    ),
  }),
  selectors: {
    selectMapDetails: (state) => state.mapDetails,
    selectTrees: (state) => state.trees,
    selectStatus: (state) => state.treesStatus,
    selectCurrentTree: (state) => state.currentTree,
    selectTreeDetails: (state) => state.treeDetails,
    selectTreeDetailsStatus: (state) => state.treeDetailsStatus,
  },
});

export const { updateMapRequestTrees, updateCurrentTree, requestTreeDetails } =
  treeSlice.actions;

export const {
  selectMapDetails,
  selectTrees,
  selectStatus,
  selectCurrentTree,
  selectTreeDetails,
  selectTreeDetailsStatus,
} = treeSlice.selectors;
