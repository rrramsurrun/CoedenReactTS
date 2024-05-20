// import { createAppSlice } from "../../redux/createAppSlice";

export type Tree = {
  id: number;
  borough: string;
  tree_name: string;
  taxon_name: string;
  common_name: string;
  longitude: number;
  latitude: number;
};

// export type TreeSliceState = {
//   trees: Tree[];
//   status: "idle" | "loading" | "failed"
// }

// const initialState: TreeSliceState = {
//   trees: [],
//   status: "idle"
// }

// export const treeSlice = createAppSlice({
//   name:'tree',
//   initialState,
//   reducers: null,

// })
