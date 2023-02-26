import { createBrowserRouter } from "react-router-dom";
import Main from "../Components/Main/Main";
import Login from "../Components/Login/Login";
import SignUp from "../Components/SignUp/SignUp";
import PrivateRoute from "../Components/PrivateRoute/PrivateRoute";
import Home from "../Components/Home/Home";
import Posts from "../Components/Posts/Posts";
import Edit from "../Components/Edit/Edit";
import UserPost from "../Components/UserPost/UserPost";
import Swipper from "../Components/Swipper/Swipper";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/home",
        element: (
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        ),
      },
      { path: "/", element: <Home /> },

      { path: "/login", element: <Login /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/post", element: <Posts /> },
      { path: "/edit/:id", element: <Edit /> },
      { path: "/swiper", element: <Swipper /> },
      {
        path: "/user",
        element: (
          <PrivateRoute>
            <UserPost />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
