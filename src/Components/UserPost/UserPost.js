import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../UseContext/UseContext";

const UserPost = () => {
  const [userData, setUserData] = useState([]);
  const { user, logOut } = useContext(AuthContext);
  const email = user?.email;
  useEffect(() => {
    fetch(`https://login-signup-server.vercel.app/user?email=${email}`, {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => {
        if (res.status === 403 || res.status === 401) {
          logOut();
        }
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setUserData(data?.data);
        }
      });
  }, [email]);
  return (
    <div className=" mt-16">
      <div className="input_wrapper">
        <div className="">
          <table className="w-full">
            {/* head */}
            <thead>
              <tr className="bg-gray-500">
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Post Id</th>
                <th className="p-3">Image</th>
              </tr>
            </thead>
            {userData.map((users) => (
              <tbody
                key={users._id}
                className="border-b bg-gray-500 justify-center"
              >
                <tr className=" justify-center">
                  <td className=" text-center">{users?.name}</td>
                  <td className=" text-center">{users?.email}</td>
                  <td className=" text-center">{users?._id}</td>
                  <td className=" text-center flex justify-center">
                    <img
                      className="w-[200px] h-[100px] object-cover rounded-md"
                      src={users?.photo}
                      alt=""
                    />
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserPost;
