import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../UseContext/UseContext";
import Swipper from "../Swipper/Swipper";

const Home = () => {
  const [inputValue, setInputValue] = useState(null);
  const { user } = useContext(AuthContext);
  // handelSubmit
  const handelSubmit = (event) => {
    event.preventDefault();
    const postInfo = {
      name: user?.displayName,
      email: user?.email,
      photo: inputValue?.photo,
      message: inputValue?.message,
    };
    // fetch
    fetch(`https://login-signup-server.vercel.app/post`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(postInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast(data.message);
          event.target.reset();
        }
      });
  };
  // handelSubmit
  const handelInput = (event) => {
    setInputValue((previous) => {
      return { ...previous, [event.target.name]: event.target.value };
    });
  };
  // handelInput

  // handelInput
  return (
    <div className="mt-16 p-10 flex justify-center items-center ">
      <form
        onSubmit={handelSubmit}
        className="lg:w-1/2 md:w-full sm:w-full w-full bg-black mx-auto p-5  shadow-md shadow-slate-700 rounded-lg"
      >
        <div className="name_filed">
          <label
            className="pb-2 inline-block text-2xl text-white"
            htmlFor="name"
          >
            Name
          </label>
          <div>
            <input
              type="text"
              className="w-full py-3 rounded-md border-none outline-none text-xl text-black px-5 bg-white"
              name="name"
              placeholder="Your Name"
              defaultValue={user?.displayName}
            />
          </div>
        </div>
        <div className="name_filed">
          <label
            className="py-2 text-2xl inline-block text-white"
            htmlFor="email"
          >
            Email
          </label>
          <div>
            <input
              type="email"
              className="w-full py-3 rounded-md border-none outline-none text-xl text-black px-5 bg-white"
              name="email"
              placeholder="Your email"
              value={user?.email}
              readOnly
            />
          </div>
        </div>
        <div className="name_filed">
          <label
            className="py-2 text-2xl inline-block text-white"
            htmlFor="name"
          >
            Photo Url
          </label>
          <div>
            <input
              onChange={handelInput}
              type="text"
              className="w-full py-3 rounded-md border-none outline-none text-xl text-black px-5 bg-white"
              name="photo"
              placeholder="Your photo url"
            />
          </div>
        </div>
        <div className="name_filed">
          <label
            className="py-2 text-2xl inline-block text-white"
            htmlFor="name"
          >
            Message
          </label>
          <div>
            <textarea
              onChange={handelInput}
              className="w-full py-3 rounded-md border-none outline-none text-xl text-black px-5 bg-white"
              name="message"
              cols="20"
              rows="5"
            ></textarea>
          </div>
        </div>
        <button
          className=" w-full py-3 bg-success text-white text-2xl rounded-md font-semibold mt-5"
          type="submit"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default Home;
