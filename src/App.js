import React, { useContext } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import { ThemeProvider } from "styled-components";
import { Store } from "./store/store";
import SignIn from "./pages/SignIn";
import Introduce from "./pages/Introduce";
import MainLayout from "./pages/MainLayout";
import ErrorPage from "./pages/ErrorPage";
import ClinicList from "./pages/ClinicList";
import EnterpriseList from "./pages/EnterpriseList";
import RequestForms from "./pages/RequestForms";
import ExamPackage from "./pages/ExamPackages";

import "antd/dist/reset.css";
import "./App.css";

const theme = {
  maxWidth: "1440px",
  mainTextColor: "#172B4D",
};
function App() {
  const { state } = useContext(Store);

  const router = createBrowserRouter([
    {
      path: "/",
      element: localStorage.getItem("user_id") ? <MainLayout /> : <Introduce />,
      children: [
        {
          path: "/clinic",
          element: <ClinicList />,
        },
        {
          path: "/enterprise",
          element: <EnterpriseList />,
        },
        {
          path: "/requestforms",
          element: <RequestForms />,
        },
        {
          path: "/exampackages",
          element: <ExamPackage />,
        },
      ]
    },
    {
      path: "/signin",
      element: localStorage.getItem("user_id") ? <MainLayout /> : <SignIn />,
    },
    {
      path: "*",
      element: <Navigate to={"/"} />,
    },
  ]);
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
