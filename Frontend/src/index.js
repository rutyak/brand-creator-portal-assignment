import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Login from "./pages/authentication/Login";
import SignUp from "./pages/authentication/SignUp";
import BrandDashboard from "./pages/brand/BrandDashboard";
import CampaignManagement from "./pages/brand/management/CampaignManagement";
import CreatorDashboard from "./pages/creator/CreatorDashboard";
import Campaign from "./pages/brand/campaign/Campaign";
import AppliedCampaigns from "./pages/creator/AppliedCampaigns";


const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "/brand",
    element: <BrandDashboard />,
  },
  {
    path: "/campaignmanagement",
    element: <CampaignManagement />,
  },
  {
    path: "/campaign",
    element: <Campaign />,
  },
  {
    path: "/creator",
    element: <CreatorDashboard />,
  },
  {
    path: "/appliedcampaign",
    element: <AppliedCampaigns />,
  },
]);

root.render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </ChakraProvider>
  </React.StrictMode>
);
