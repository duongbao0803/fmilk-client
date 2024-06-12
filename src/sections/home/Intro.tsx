import React from "react";

const Intro: React.FC = () => {
  return (
    <>
      {/* Intro */}
      <div className="my-10 grid grid-cols-3 px-52">
        <div className="text-justify">
          <div className="relative mb-8" data-aos="fade-down">
            <h2 className="text-[25px] font-medium text-[#1385b7]">
              THÁNG TỚI CÓ GÌ MỚI?
            </h2>
            <div className="absolute bottom-[-10px] mb-1 h-[1px] w-12 bg-[#1385b7]"></div>
            <div className="absolute bottom-[-13px] left-6 h-[1px] w-12 bg-[#1385b7]"></div>
          </div>
          <div className="flex flex-col gap-y-5" data-aos="fade-right">
            <div>
              <p>Tháng Tới Có Gì Mới? Chuyên Mục Mới Toanh Trên Trang FMilk</p>
            </div>
            <div>
              <p>
                Với mong muốn đồng hành và tạo cảm hứng cho người tiêu dùng
                trong quá trình lựa chọn và sử dụng các sản phẩm sữa, giúp các
                hoạt động chăm sóc sức khỏe trở nên thú vị, gần gũi và hấp dẫn.
                Chính vì lý do đó, “Chuyên mục: Tháng tới có gì mới?” chính thức
                được ra đời trên trang web bán sữa của chúng tôi.
              </p>
            </div>
            <div>
              <p>Nội dung chính bao gồm:</p>
              <p>
                - Góc Khám Phá: Giới Thiệu Điều Thú Vị Xuất Hiện Trong Tháng
                Tới.
              </p>
              <p>- Góc Đồng Hành: Giới Thiệu Mẹo Hay Trong Sử Dụng Sữa.</p>
              <p>
                Bên cạnh đó còn nhiều bất ngờ đang chờ đón bạn trong các số tiếp.
              </p>
            </div>
            <p>
              <i>Mời quý khách hàng cùng đón đọc! Bản tin số 1 – Tháng 6. </i>
            </p>  
            <div data-aos="fade-up">
              <button className="cssbuttons-io-button">
                Xem thêm
                <div className="icon">
                  <svg
                    height="24"
                    width="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 0h24v24H0z" fill="none"></path>
                    <path
                      d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center" data-aos="flip-up">
          <img
            src="https://insacmau.com/wp-content/uploads/2023/02/logo-FPT-Polytechnic-.png"
            alt=""
            className="object-cover"
          />
        </div>
        <div className="flex items-center text-justify">
          <div>
            <div className="relative mb-8" data-aos="fade-down">
              <h2 className="text-[25px] font-medium text-[#1385b7]">
                VÌ SAO NÊN CHỌN{" "}
                <img
                  src="https://insacmau.com/wp-content/uploads/2023/02/logo-FPT-Polytechnic-.png"
                  alt=""
                  className="inline h-[40px] object-cover"
                />
              </h2>
              <div className="absolute bottom-[-10px] mb-1 h-[1px] w-12 bg-[#1385b7]"></div>
              <div className="absolute bottom-[-13px] left-6 h-[1px] w-12 bg-[#1385b7]"></div>
            </div>
            <div className="flex flex-col gap-y-5" data-aos="fade-left">
              <div>
                <p>
                  Thứ nhất: Giáo dục STEM+ tích hợp theo cách tiếp cận liên môn
                  (interdisciplinary) và thông qua thực hành. Mục tiêu nhằm giúp
                  hỗ trợ hình thành những con người có năng lực làm việc hiệu
                  quả trong môi trường làm việc có tính sáng tạo cao với những
                  công việc đòi hỏi trí thức, trí tuệ của thế kỷ 21.
                </p>
              </div>
              <div>
                <p>
                  Thứ hai: Giáo dục STEM+ đề cao đến việc hình thành và phát
                  triển năng lực giải quyết vấn đề cho người học. Trong mỗi bài
                  học theo chủ đề STEM+, học sinh được đặt trước một tình huống
                  có vấn đề thực tiễn cần giải quyết liên quan đến các kiến thức
                  khoa học…
                </p>
              </div>
              <div data-aos="fade-up">
                <button className="cssbuttons-io-button">
                  Xem thêm
                  <div className="icon">
                    <svg
                      height="24"
                      width="24"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M0 0h24v24H0z" fill="none"></path>
                      <path
                        d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Intro;
