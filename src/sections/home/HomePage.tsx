import React from "react";
import { Carousel } from "antd";
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";

const HomePage: React.FC = () => {
  // const items: TabsProps["items"] = [
  //   {
  //     key: "1",
  //     label: "Tin bài",
  //     children: "Content of Tab Pane 1",
  //   },
  //   {
  //     key: "2",
  //     label: "CLB Stemplus",
  //     children: "Content of Tab Pane 2",
  //   },
  //   {
  //     key: "3",
  //     label: "Trải nghiệm",
  //     children: "Content of Tab Pane 3",
  //   },
  // ];
  return (
    <>
      <div className="relative">
        <div className="background">
          <Carousel autoplay>
            <div className="background"></div>
            <div className="background2"></div>
          </Carousel>
        </div>
        <div className="absolute top-[20px] w-full">
          <Header />
        </div>
      </div>

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
              <p>
                Tháng tới có gì mới? Chuyên mục mới toanh trên trang web Chương
                trình Hoạt động Giáo dục STEM+
              </p>
            </div>
            <div>
              <p>
                Với mong muốn đồng hành và tạo cảm hứng cho giáo viên trong quá
                trình tổ chức các hoạt động STEM+, giúp các hoạt động trở nên
                thú vị, gần gũi và hấp dẫn. Chính vì lý do đó, “Chuyên mục:
                Tháng tới có gì mới?” chính thức được ra đời.
              </p>
            </div>
            <div>
              <p>Nội dung chính bao gồm:</p>
              <p>
                – Góc khám phá: Giới thiệu điều thú vị xuất hiện trong tháng
                tới.
              </p>
              <p>– Góc đồng hành: Giới thiệu mẹo hay trong giảng dạy STEM+.</p>
              <p>
                Bên cạnh đó còn nhiều bất ngờ đang chờ đón quý thầy cô trong các
                số tiếp theo.
              </p>
            </div>
            <p>
              <i>Mời quý thầy cô cùng đón đọc! Bản tin số 9 – Tháng 5. </i>
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

      {/* Information */}
      {/* <section className="py-20 relative flex flex-row w-full">
        <div className="background3 absolute"></div>
      </section> */}

      {/* Partner */}
      <section className="my-32 px-52">
        <div className="mb-10 flex justify-center" data-aos="fade-down">
          <span className="border-b-2 border-orange-500 text-center text-[25px] font-medium text-[#1385b7]">
            ĐỐI TÁC
          </span>
        </div>
        <div className="flex justify-center">
          <div data-aos="fade-right">
            <img
              src="https://reviewedu.net/wp-content/uploads/2021/08/dai-hoc-fpt-lo-go4444.png"
              alt=""
              className="h-[200px] w-[400px] object-cover"
            />
          </div>

          <div data-aos="fade-up">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDkaQZF8f7hA4HeNwe-7dT9_SM5eriS61h7Z8GcIFzRg&s"
              alt=""
              className="h-[200px] w-[400px] object-cover"
            />
          </div>
          <div data-aos="fade-left">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRefb7yqbmnt8f2KMWUn2f4xv5vzkdl2A-UOVlpO7J4cB20PRNlFywLDsYgBGQ7NzYwIR4&usqp=CAU"
              alt=""
              className="h-[200px] w-[400px] object-cover"
            />
          </div>
        </div>
      </section>
      {/* <ChatBoxFacebook /> */}
      <Footer />
    </>
  );
};

export default HomePage;
