import { Navigate, Route, Routes } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../services/user";

import HomePage from "../pages/HomePage";
import DashboardPage from "../pages/DashboardPage";
import AuthPage from "../pages/AuthPage";
import AdminPage from "../pages/AdminPage";
import PageNotFound from "../pages/404";

function Router() {
  const { data, isPending, error } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });
  if (isPending) return <p>Loading..</p>;

  console.log({ data, isPending, error });

  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route
        path="/dashboard"
        element={data ? <DashboardPage /> : <Navigate to="/auth" />}
      />
      <Route
        path="/auth"
        element={data ? <Navigate to="/dashboard" /> : <AuthPage />}
      />
      <Route
        path="/admin"
        element={
          data && data.data.role === "ADMIN" ? (
            <AdminPage />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default Router;
