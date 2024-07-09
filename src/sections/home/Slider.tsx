import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/swiper-bundle.css";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import { Card } from "antd";
import usePostService from "@/services/postService";
import { PostInfo } from "@/interfaces/interface";

const Slider: React.FC = () => {
  const { Meta } = Card;
  const { posts } = usePostService();

  return (
    <>
      <div className="flex justify-center" data-aos="fade-down">
        <span className="border-b-2 border-[#1385b7] border-x-[#1385b7] text-center text-[25px] font-medium text-[#1385b7]">
          BẢNG TIN
        </span>
      </div>
      <div data-aos="fade-right">
        <Swiper
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 2,
            },
            900: {
              slidesPerView: 2,
            },
            1150: {
              slidesPerView: 3,
            },
            1200: {
              slidesPerView: 3,
            },
            1400: {
              slidesPerView: 4,
            },
            1500: {
              slidesPerView: 4,
            },
            1900: {
              slidesPerView: 5,
            },
            2400: {
              slidesPerView: 6,
            },
            3300: {
              slidesPerView: 7,
            },
          }}
          modules={[FreeMode, Pagination, Autoplay]}
          className="mySwiper h-[500px]"
        >
          {posts.map((post: PostInfo, index: number) => (
            <SwiperSlide key={index}>
              <Card
                hoverable
                className="w-[250px] border-2"
                cover={<img alt={post?.title} src={post?.image} />}
              >
                <Meta title={post?.title} description={post?.description} />
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Slider;
