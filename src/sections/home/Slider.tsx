import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper/modules";
import { Card } from "antd";

const Slider: React.FC = () => {
  const { Meta } = Card;

  return (
    <>
      <div className="flex justify-center" data-aos="fade-down">
        <span className="border-b-2 border-[#1385b7] border-x-[#1385b7] text-center text-[25px] font-medium text-[#1385b7]">
          BẢNG TIN
        </span>
      </div>
      <div data-aos="fade-right">
        <Swiper
          slidesPerView={4}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination]}
          className="mySwiper h-[450px]"
        >
          <SwiperSlide>
            <Card
              hoverable
              style={{ width: 240 }}
              cover={
                <img
                  alt="example"
                  src="https://firebasestorage.googleapis.com/v0/b/swd392-d2c4e.appspot.com/o/FMilk%2Fsua-tiet-trung-co-gai-ha-lan-dutch-lady-220ml.jpg?alt=media&token=60f64885-f78a-4e92-99ad-ff0245e59a02"
                />
              }
            >
              <Meta
                title="Europe Street beat"
                description="www.instagram.com"
              />
            </Card>
          </SwiperSlide>
          <SwiperSlide>
            <Card
              hoverable
              style={{ width: 240 }}
              cover={
                <img
                  alt="example"
                  src="https://firebasestorage.googleapis.com/v0/b/swd392-d2c4e.appspot.com/o/FMilk%2Fsua-tiet-trung-co-gai-ha-lan-dutch-lady-220ml.jpg?alt=media&token=60f64885-f78a-4e92-99ad-ff0245e59a02"
                />
              }
            >
              <Meta
                title="Europe Street beat"
                description="www.instagram.com"
              />
            </Card>
          </SwiperSlide>{" "}
          <SwiperSlide>
            <Card
              hoverable
              style={{ width: 240 }}
              cover={
                <img
                  alt="example"
                  src="https://firebasestorage.googleapis.com/v0/b/swd392-d2c4e.appspot.com/o/FMilk%2Fsua-tiet-trung-co-gai-ha-lan-dutch-lady-220ml.jpg?alt=media&token=60f64885-f78a-4e92-99ad-ff0245e59a02"
                />
              }
            >
              <Meta
                title="Europe Street beat"
                description="www.instagram.com"
              />
            </Card>
          </SwiperSlide>{" "}
          <SwiperSlide>
            <Card
              hoverable
              style={{ width: 240 }}
              cover={
                <img
                  alt="example"
                  src="https://firebasestorage.googleapis.com/v0/b/swd392-d2c4e.appspot.com/o/FMilk%2Fsua-tiet-trung-co-gai-ha-lan-dutch-lady-220ml.jpg?alt=media&token=60f64885-f78a-4e92-99ad-ff0245e59a02"
                />
              }
            >
              <Meta
                title="Europe Street beat"
                description="www.instagram.com"
              />
            </Card>
          </SwiperSlide>{" "}
          <SwiperSlide>
            <Card
              hoverable
              style={{ width: 240 }}
              cover={
                <img
                  alt="example"
                  src="https://firebasestorage.googleapis.com/v0/b/swd392-d2c4e.appspot.com/o/FMilk%2Fsua-tiet-trung-co-gai-ha-lan-dutch-lady-220ml.jpg?alt=media&token=60f64885-f78a-4e92-99ad-ff0245e59a02"
                />
              }
            >
              <Meta
                title="Europe Street beat"
                description="www.instagram.com"
              />
            </Card>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

export default Slider;
