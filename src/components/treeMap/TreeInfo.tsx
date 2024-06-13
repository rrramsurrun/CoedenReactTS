import { useEffect } from "react";
import {
  Tree,
  TreeDetails,
  requestStatus,
  requestTreeDetails,
  selectTreeDetails,
  selectTreeDetailsStatus,
} from "../../features/trees/treeSlice";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import styles from "./TreeInfo.module.css";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

function TabContent(
  tabType: "genus" | "species",
  tabTypeData: string,
  treeDetailsStatus: requestStatus,
  treeDetails: TreeDetails | undefined
) {
  if (treeDetailsStatus === "FETCHING") {
    return <div>{`Retrieving ${tabType} information`}</div>;
  }
  if (treeDetailsStatus === "FAILED") {
    return <div>{`Error retrieving ${tabType} information`}</div>;
  }
  if (treeDetailsStatus === "IDLE" || treeDetails === undefined) {
    return <div>{`Select a tree to see its ${tabType} information`}</div>;
  }
  if (!(tabType in treeDetails))
    return <div>{`Error retrieving ${tabType} information`}</div>;
  if (treeDetails[tabType] === null) {
    return (
      <div>
        {`No ${tabType} information available for `}
        <span>${tabTypeData}</span> {tabType}
      </div>
    );
  }
  return <div>{treeDetails[tabType]!.description}</div>;
}

export function TreeInfo(props: { tree: Tree | undefined }) {
  const { tree } = props;
  const dispatch = useAppDispatch();
  const treeDetails = useAppSelector(selectTreeDetails);
  const treeDetailsStatus = useAppSelector(selectTreeDetailsStatus);
  useEffect(() => {
    if (tree !== undefined) {
      dispatch(requestTreeDetails(tree));
    }
  }, [tree]);

  if (tree === undefined) {
    return <div></div>;
  }
  return (
    <div>
      <div>
        <p>Common Name: {tree.commonName}</p>
        <p>Species: {tree.taxon}</p>
        <p>Genus: {tree.genus}</p>
      </div>
      <Tabs className={styles.tabs}>
        <TabList>
          <Tab selectedClassName={styles.activeTab}>Genus</Tab>
          <Tab selectedClassName={styles.activeTab}>Species</Tab>
        </TabList>

        <TabPanel className={styles.tabPanel}>
          {TabContent("genus", tree.genus, treeDetailsStatus, treeDetails)}
        </TabPanel>
        <TabPanel>
          {TabContent("species", tree.taxon, treeDetailsStatus, treeDetails)}
        </TabPanel>
      </Tabs>
    </div>
  );
}
