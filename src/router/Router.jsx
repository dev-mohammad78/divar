
import { Navigate, Route, Routes } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../services/user";

import Loader from "../components/Loader";
import HomePage from "../pages/HomePage";
import DashboardPage from "../pages/DashboardPage";
import CreatePostPage from "../pages/CreatePostPage";
import AuthPage from "../pages/AuthPage";
import AdminPage from "../pages/AdminPage";
import PostsPage from "../pages/PostsPage";
import PostDetailsPage from "../pages/PostDetailsPage";
import PageNotFound from "../pages/404";

function Router() {
  const { data, isPending, error } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    retry: false,
  });

  if (isPending) return <Loader size={80} />;

  const profile = error ? null : data?.data;
  const isAdmin = profile?.role === "ADMIN";
  const isAuthenticated = !!profile;

  return (
    <Routes>
      <Route index element={<HomePage />} />

      <Route
        path="/dashboard"
        element={
          isAuthenticated ? (
            <DashboardPage />
          ) : (
            <Navigate to="/auth" replace />
          )
        }
      />

      <Route
        path="/post/create"
        element={
          isAuthenticated ? (
            <CreatePostPage />
          ) : (
            <Navigate to="/auth" replace />
          )
        }
      />

      <Route
        path="/auth"
        element={
          isAuthenticated ? (
            <Navigate to={isAdmin ? "/admin" : "/dashboard"} replace />
          ) : (
            <AuthPage />
          )
        }
      />

      <Route
        path="/admin"
        element={
          isAdmin ? (
            <AdminPage />
          ) : (
            <Navigate
              to={isAuthenticated ? "/dashboard" : "/auth"}
              replace
            />
          )
        }
      />

      <Route path="/posts" element={<PostsPage />} />
      <Route path="/posts/:id" element={<PostDetailsPage />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default Router;
