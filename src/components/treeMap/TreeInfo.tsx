import { Tree } from "../../features/trees/treeSlice";

export function TreeInfo(props: { tree: Tree | undefined }) {
  const { tree } = props;
  if (tree === undefined) {
    return <div></div>;
  }
  return (
    <div>
      <p>{tree.commonName}</p>
    </div>
  );
}
