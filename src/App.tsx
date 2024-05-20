import {
  Route,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";
import SimpleTreeAPI from "./pages/SimpleTreeAPI";
import AppLayout from "./pages/AppLayout";
import TreeMap from "./pages/TreeMap";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppLayout />}>
      <Route path="/" element={<SimpleTreeAPI />} />
      <Route path="/map" element={<TreeMap />} />
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
