import Layout from "@/pages/Layout"; // src/pages/layout
import Login from "@/pages/Login";
import { AuthRoute } from "@/components/AuthRoute";

import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "@/pages/Home";
import Publish from "@/pages/Publish";
import Article from "@/pages/Article";

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
        path: "home",
        element: <Home />,
      },
      {
        path: "article",
        element: <Article />,
      },
      {
        path: "publish",
        element: <Publish />,
      },
      {
        path: "*", // Catch-all for unmatched routes
        element: <Navigate to="/home" />,
      },
    ],
  },

  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
