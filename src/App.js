import { useContext } from "react";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./Router/Router";
import { AuthContext } from "./UseContext/UseContext";

function App() {
  const { toggle } = useContext(AuthContext);
  return (
    <div className="header_wrapper">
      <header
        className={`${toggle ? " bg-white" : " bg-black"} ${
          toggle ? "text-black" : "text-white"
        } lg:w-full lg:mx-auto`}
      >
        <RouterProvider router={router}></RouterProvider>
      </header>
    </div>
  );
}

export default App;
