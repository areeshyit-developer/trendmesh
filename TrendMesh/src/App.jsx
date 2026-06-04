import React from "react";
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import AuthContainer from "./Components/Login-signup/AuthContainer";
import Dashboard from "./Components/Pages/Dashboard";
import "./Components/Login-signup/loginsignup.css";
import CreatePost from "./Components/Pages/CreatePost";
import AIChat from "./Components/Pages/AIChat";
import ScheduledPosts from "./Components/Pages/ScheduledPosts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForgotPassword from "./Components/Login-signup/ForgotPassword";
import EmailSent from "./Components/Login-signup/EmailSent";
import ResetPassword from "./Components/Login-signup/ResetPassword";
import Facebookpg from "./Components/Pages/Facebookpg";
import Instagram from "./Components/Pages/Instagram";
import Twitter from "./Components/Pages/Twitter";
import TikTok from "./Components/Pages/Tiktok";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/signup",
    element: <AuthContainer mode="signup" />,
  },
  {
    path: "/login",
    element: <AuthContainer mode="login" />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  { path: "/forgot-password/sent", element: <EmailSent /> },
  {
    path: "/reset-password/:token",
    element: <ResetPassword />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      { path: "createpost", element: <CreatePost /> },
      { path: "aichat", element: <AIChat /> },
      { path: "scheduledposts", element: <ScheduledPosts /> },
      { path: "facebook", element: <Facebookpg /> },
      { path: "instagram", element: <Instagram /> },
      { path: "twitter", element: <Twitter /> },
      { path: "tiktok", element: <TikTok /> },
    
    ],
  },
]);
function App() {
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
