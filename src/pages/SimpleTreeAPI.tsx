import treeLogo from "../assets/treeImage.png";
import {
  getTrees,
  selectStatus,
  selectTrees,
} from "../features/trees/treeSlice";
import { ClipLoader } from "react-spinners";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import styles from "./SimpleTreeAPI.module.css";

export default function SimpleTreeAPI() {
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
    <main>
      <div>
        <img src={treeLogo} className={styles.logo} />
      </div>
      <h1>Coeden</h1>
      <div className={styles.card}>
        <button
          disabled={findingTree === "loading"}
          onClick={() => dispatch(getTrees())}
        >
          {buttonText()}
        </button>
        {TreeSection()}
      </div>
    </main>
  );
}
