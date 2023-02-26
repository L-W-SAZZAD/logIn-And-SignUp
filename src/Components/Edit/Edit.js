import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Edit = () => {
  const [post, setPost] = useState({});
  const [inputValue, setInputValue] = useState(null);
  const { name, email, photo, message } = post;
  const navigate = useNavigate();

  const { id } = useParams();
  useEffect(() => {
    fetch(`https://login-signup-server.vercel.app/post/${id}`, {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setPost(data.data);
        }
      });
  }, [id]);

  //   handelChange
  const handelChange = (event) => {
    setInputValue((previous) => {
      return { ...previous, [event.target.name]: event.target.value };
    });
  };
  // handelChange
  // handelEdit
  const handelEdit = (event) => {
    event.preventDefault();
    const editInfo = inputValue;
    fetch(`https://login-signup-server.vercel.app/post/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(editInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast(data.message);
          navigate("/post");
        }
      });
  };
  // handelEdit

  return (
    <div className="edit_wrapper mt-16  h-screen flex justify-center items-center">
      <form
        onSubmit={handelEdit}
        className="main_wrapper p-5 lg:w-1/2 bg-black shadow-lg shadow-slate-700 mx-auto"
      >
        <div className="input_filed">
          <input
            onChange={handelChange}
            className=" w-full inline-block py-2 px-5 my-2 outline-none border-none rounded-md focus:ring-1"
            type="text"
            name="name"
            defaultValue={name}
          />
        </div>
        <div className="input_filed">
          <input
            onChange={handelChange}
            className=" w-full inline-block py-2 px-5 my-2 outline-none border-none rounded-md focus:ring-1"
            type="email"
            name="email"
            defaultValue={email}
          />
        </div>
        <div className="input_filed flex justify-center items-center gap-3">
          <input
            onChange={handelChange}
            className="w-[70%] inline-block py-2 px-5 my-2 outline-none border-none rounded-md focus:ring-1"
            type="text"
            name="photo"
            defaultValue={photo}
          />
          <div className="img w-[30%]">
            <img className="h-[150px] w-full" src={photo} alt="" />
          </div>
        </div>
        <div className="input_filed">
          <textarea
            onChange={handelChange}
            className=" w-full inline-block py-2 px-5 my-2 outline-none border-none rounded-md focus:ring-1"
            name="message"
            cols="20"
            rows="5"
            defaultValue={message}
          ></textarea>
        </div>
        <button className="w-full bg-success py-2 rounded-md my-2">Edit</button>
      </form>
    </div>
  );
};

export default Edit;
