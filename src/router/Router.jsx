import { Navigate, Route, Routes } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../services/user";

import Loader from "../components/Loader";
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
  if (isPending) return <Loader size={80} />;

  console.log({ data, isPending, error });

  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route
        path="/dashboard"
        element={
          !data ? (
            <Navigate to="/auth" replace />
          ) : data.data.role === "ADMIN" ? (
            <Navigate to="/admin" replace />
          ) : (
            <DashboardPage />
          )
        }
      />
      <Route
        path="/auth"
        element={
          data ? (
            <Navigate
              to={data.data.role === "ADMIN" ? "/admin" : "/dashboard"}
              replace
            />
          ) : (
            <AuthPage />
          )
        }
      />
      <Route
        path="/admin"
        element={
          data?.data?.role === "ADMIN" ? (
            <AdminPage />
          ) : (
            <Navigate to={data ? "/dashboard" : "/auth"} replace />
          )
        }
      />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default Router;
