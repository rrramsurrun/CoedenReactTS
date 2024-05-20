import { useEffect, useState } from "react";
import treeLogo from "./assets/treeImage.png";
import "./App.css";
import { Tree } from "./features/trees/treeSlice";
import { getSampleTrees } from "./features/trees/treesAPI";
import { ClipLoader } from "react-spinners";

function App() {
  const [findingTree, setFindingTree] = useState(false);
  const [singleTree, setSingleTree] = useState<Tree | null>(null);
  useEffect(() => {
    if (findingTree) {
      getSampleTrees().then((data) => {
        setSingleTree(data[Math.floor(Math.random() * data.length)]);
        setFindingTree(false);
      });
    }
  }, [findingTree]);

  function TreeSection() {
    if (findingTree) {
      return (
        <div>
          <ClipLoader />
        </div>
      );
    }
    if (singleTree) {
      return (
        <div>
          <p>{singleTree.common_name}</p>
          <p>{singleTree.latitude}</p>
          <p>{singleTree.longitude}</p>
        </div>
      );
    }
  }

  return (
    <>
      <div>
        <img src={treeLogo} className="logo" />
      </div>
      <h1>Coeden</h1>
      <div className="card">
        <button disabled={findingTree} onClick={() => setFindingTree(true)}>
          {singleTree
            ? "Click to find another tree"
            : "Click to retrieve a tree"}
        </button>
        {TreeSection()}
      </div>
    </>
  );
}

export default App;
