import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
const Swipper = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch(`https://login-signup-server.vercel.app/posts`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setPosts(data.data);
        }
      });
  }, []);
  return (
    <div className=" h-screen w-full flex justify-center items-center">
      <Swiper slidesPerView={3} spaceBetween={30} className="mySwiper w-[60%]">
        {posts?.map((post) => (
          <SwiperSlide key={post?._id} className="">
            <img
              className="w-full h-[300px] rounded-md shadow-md shadow-slate-500"
              src={post?.photo}
              alt=""
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Swipper;
