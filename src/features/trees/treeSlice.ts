import { createAppSlice } from "../../redux/createAppSlice";
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

export type TreeSliceState = {
  trees: Tree[];
  status: "idle" | "loading" | "failed" | "successful";
  error: string | null;
};

const initialState: TreeSliceState = {
  trees: [],
  status: "idle",
  error: null,
};

export const treeSlice = createAppSlice({
  name: "tree",
  initialState,
  reducers: (create) => ({
    getTrees: create.asyncThunk(
      async () => {
        const trees = await getSampleTrees();
        return trees;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "successful";
          state.trees = [
            action.payload[Math.floor(Math.random() * action.payload.length)],
          ];
        },
        rejected: (state) => {
          state.status = "failed";
        },
      }
    ),
  }),
  selectors: {
    selectTrees: (tree) => tree.trees,
    selectStatus: (tree) => tree.status,
  },
});

export const { getTrees } = treeSlice.actions;

export const { selectTrees, selectStatus } = treeSlice.selectors;
