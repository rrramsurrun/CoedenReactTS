import {
  Route,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Navigate,
} from "react-router-dom";
import AppLayout from "./pages/AppLayout";
import TreeMapPage from "./pages/TreeMapPage";
import LoginRegisterPage from "./pages/LoginRegisterPage";
import { useEffect } from "react";
import { useAppDispatch } from "./redux/hooks";
import { loginWithToken } from "./features/users/userSlice";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppLayout />}>
      <Route path="/" element={<TreeMapPage />} />
      <Route path="/map" element={<Navigate to="/" replace />} />
      <Route path="/login" element={<LoginRegisterPage register={false} />} />
      <Route path="/register" element={<LoginRegisterPage register={true} />} />
      <Route path="*" element={<TreeMapPage />} />
    </Route>
  )
);

export default function App() {
  const dispatch = useAppDispatch();
  //Check if JWT token in local storage
  useEffect(() => {
    const currentToken = localStorage.getItem("CoedenToken");
    if (currentToken !== null) {
      dispatch(loginWithToken(currentToken));
    }
  }, []);

  return <RouterProvider router={router} />;
}
