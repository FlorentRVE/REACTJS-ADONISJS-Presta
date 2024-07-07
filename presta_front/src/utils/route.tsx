import HomePage from "@/pages/HomePage";
import ProfilePage from "@/pages/ProfilePage";
import { createBrowserRouter } from "react-router-dom";

// Affectation des routes

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/profile", element: <ProfilePage /> },
]);

export default router;
