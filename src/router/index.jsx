import {createBrowserRouter} from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "../features/auth/ProtectedRoute";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";

const withLayout = (el) => (
  <>
    <Header />
    <main>{el}</main>
    <Footer />
  </>
);

export const router = createBrowserRouter([
  {path: "/", element: withLayout(<Home />)},
  {path: "/login", element: withLayout(<Login />)},
  {
    element: withLayout(<ProtectedRoute />),
    children: [{path: "/profile", element: <Profile />}]
  },
  {path: "*", element: withLayout(<NotFound />)}
]);
