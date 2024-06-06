import {
  Route,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Navigate,
} from "react-router-dom";
import AppLayout from "./pages/AppLayout";
import TreeMapPage from "./pages/TreeMapPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppLayout />}>
      <Route path="/" element={<TreeMapPage />} />
      <Route path="/map" element={<Navigate to="/" replace />} />
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
