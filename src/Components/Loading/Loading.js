import React from "react";

const Loading = () => {
  return (
    <div className="loading flex justify-center items-center">
      <div className=" w-8 h-8 rounded-full ring-2 animate-spin duration-500 ring-gray-900"></div>
    </div>
  );
};

export default Loading;
