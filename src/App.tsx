import { useEffect, useState } from "react";
import treeLogo from "./assets/treeImage.png";
import "./App.css";
import {
  Tree,
  getTrees,
  selectStatus,
  selectTrees,
} from "./features/trees/treeSlice";
import { ClipLoader } from "react-spinners";
import { useAppDispatch, useAppSelector } from "./redux/hooks";

function App() {
  const dispatch = useAppDispatch();
  const singleTree = useAppSelector(selectTrees);
  const findingTree = useAppSelector(selectStatus);

  function TreeSection() {
    if (findingTree === "loading") {
      return (
        <div>
          <ClipLoader />
        </div>
      );
    }
    if (singleTree.length > 0) {
      return (
        <div>
          <p>{singleTree[0].common_name}</p>
          <p>{singleTree[0].latitude}</p>
          <p>{singleTree[0].longitude}</p>
        </div>
      );
    }
  }
  function buttonText() {
    switch (findingTree) {
      case "successful":
        return "Click to find another tree";
      default:
        return "Click to retrieve a tree";
    }
  }

  return (
    <>
      <div>
        <img src={treeLogo} className="logo" />
      </div>
      <h1>Coeden</h1>
      <div className="card">
        <button
          disabled={findingTree === "loading"}
          onClick={() => dispatch(getTrees())}
        >
          {buttonText()}
        </button>
        {TreeSection()}
      </div>
    </>
  );
}

export default App;
