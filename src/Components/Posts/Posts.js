import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [read, setRead] = useState(true);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`https://login-signup-server.vercel.app/posts`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setPosts(data.data);
          setLoading(false);
        }
      });
  }, [refresh]);
  // handel Delete
  const handelDelete = (id) => {
    fetch(`https://login-signup-server.vercel.app/posts/${id}`, {
      method: "DELETE",
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast(data.message);
          setRefresh(true);
        }
      });
  };
  // handel Delete
  // handelEdit
  const navigate = useNavigate();
  const handelEdit = (id) => {
    navigate(`/edit/${id}`);
  };
  // handelEdit
  return (
    <>
      {loading ? (
        <div className="  space-x-2">
          <div className="w-4 h-4 rounded-full animate-pulse dark:bg-violet-400"></div>
          <div className="w-4 h-4 rounded-full animate-pulse dark:bg-violet-400"></div>
          <div className="w-4 h-4 rounded-full animate-pulse dark:bg-violet-400"></div>
        </div>
      ) : (
        <div className="post_wrapper mt-16 grid lg:grid-cols-3 md:grid-cols-2 gap-3 p-1">
          {posts.map((post) => (
            <div
              key={post?._id}
              className="single_post p-5 shadow-md shadow-slate-700 relative"
            >
              <h2>Name : {post?.name}</h2>
              <h4>Email : {post?.email}</h4>
              <div className="img overflow-hidden cursor-pointer rounded-md mt-3">
                <img
                  className=" rounded-md w-full h-[300px] duration-500 hover:scale-105 block object-cover "
                  src={post?.photo}
                  alt=""
                />
              </div>
              <p className=" leading-5 py-3 cursor-pointer">
                {read ? post?.message.slice(0, 200) : post?.message}
                <span
                  onClick={() => setRead(false)}
                  className=" underline text-red-600"
                >
                  Read More
                </span>
              </p>
              <div className="flex justify-between my-3 cursor-pointer">
                <button
                  onClick={() => handelDelete(post._id)}
                  className=" bg-red-600 py-2 px-6 rounded-md absolute bottom-2 "
                >
                  Delete
                </button>

                <label htmlFor="my-modal-3">
                  <button
                    onClick={() => handelEdit(post._id)}
                    className="absolute bottom-2 right-5 bg-success px-6 py-2 rounded-md"
                  >
                    Edit
                  </button>
                </label>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Posts;
