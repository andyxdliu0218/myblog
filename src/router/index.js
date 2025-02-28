import Layout from "@/pages/Layout"; // src/pages/layout
import Login from "@/pages/Login";
import { AuthRoute } from "@/components/AuthRoute";

import { createBrowserRouter, Navigate } from "react-router-dom";
import { React, lazy, Suspense } from "react";
// import Home from "@/pages/Home";
// import Publish from "@/pages/Publish";
// import Article from "@/pages/Article";

const Home = lazy(() => import("@/pages/Home"));
const Publish = lazy(() => import("@/pages/Publish"));
const Article = lazy(() => import("@/pages/Article"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthRoute>
        <Layout />
      </AuthRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={"loading"}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "article",
        element: (
          <Suspense fallback={"loading"}>
            <Article />
          </Suspense>
        ),
      },
      {
        path: "publish",
        element: (
          <Suspense fallback={"loading"}>
            <Publish />
          </Suspense>
        ),
      },
      {
        path: "*", // Catch-all for unmatched routes
        element: <Navigate to="/" />,
      },
    ],
  },

  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
