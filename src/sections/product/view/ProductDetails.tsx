import Header from "@/layout/Header";
import {
  FrownOutlined,
  InteractionOutlined,
  MehOutlined,
  SafetyOutlined,
  SearchOutlined,
  SmileOutlined,
  StarFilled,
  TruckOutlined,
} from "@ant-design/icons";
import { Button, Form, Modal } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Product {
  image: string;
  name: string;
  rating: number;
  price: number;
  description: string;
}

interface Comment {
  id: number;
  username: string;
  content: string;
  date: string;
}

function ProductDetailsPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const [comments] = useState<Comment[]>([
    { id: 1, username: "Unknow", content: "unknow", date: "1000 ngày trước" },
    { id: 2, username: "Unknow", content: "unknow", date: "1000 ngày trước" },
    { id: 3, username: "Unknow", content: "unknow", date: "1000 ngày trước" },
  ]);
  const [replyInputs, setReplyInputs] = useState<{ [key: number]: boolean }>(
    {},
  );
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://fmilk-server.onrender.com/api/v1/product/${id}`,
        );
        console.log("data", response);
        setProduct(response.data.productInfo);
      } catch (error) {
        console.error("Error fetching the product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const [openModal, setOpenModal] = useState(false);
  const handleShowModal = () => {
    setOpenModal(true);
  };

  const handleOk = () => {
    setOpenModal(false);
  };

  const handleCancel = () => {
    setOpenModal(false);
  };

  const handleReplyClick = (commentId: number) => {
    setReplyInputs((prevState) => ({
      ...prevState,
      [commentId]: !prevState[commentId],
    }));
  };

  const handleSendReply = (commentId: number) => {
    // Xử lý gửi bình luận tại đây
    console.log(`Sending reply for comment ID: ${commentId}`);
  };

  if (!product) {
    return null;
  }

  return (
    <div className="bg-gray-100">
      <Header />
      <div className="flex justify-end rounded-2xl bg-white p-10">
        <div className="items-center pr-5">
          <div className="relative h-[500px] w-[500px] border-2">
            <img
              src={product.image}
              alt="Product"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <div className="items-center justify-center pl-5 text-left">
          <div className="border-b-2 pb-3">
            <h1 className="ml-2 w-[800px] text-2xl font-bold text-blue-700">
              {product.name}
            </h1>
            <div className="flex">
              <div className="ml-2 border-r-2 pr-5 text-xl">
                Rating:{" "}
                {Array(product.rating)
                  .fill(<StarFilled className="text-yellow-300" />)
                  .map((star, index) => (
                    <span key={index}>{star}</span>
                  ))}
              </div>
              <div className="border-r-2 px-5 text-xl">
                Thương hiệu: Dutch Lady
              </div>
              <div className="pl-5 text-xl">Mã SP: TP-6023</div>
            </div>
          </div>
          <div className="ml-2 mt-2 flex">
            <div className="flex">
              <div className="w-36 pt-1.5 text-xl"> Giá: </div>
              <div>
                <div className="flex">
                  <p className="mr-3 text-3xl font-semibold text-orange-500 ">
                    {product.price}
                  </p>
                  <div className="mb-[2.5px] place-content-end text-sm text-gray-500 line-through">
                    625.000đ
                  </div>
                </div>
                <p>Được áp dụng đến hết ngày 13/06/2024</p>
              </div>
            </div>
          </div>
          <div className="ml-2 flex pt-3">
            <div className="w-36">Tình trạng: </div>
            <div className="font-bold text-green-500">Còn hàng</div>
          </div>
          <div className="ml-2 flex pt-3">
            <div className="w-36">Vận chuyển:</div>
            <div className="font-bold">
              Miễn phí vận chuyển cho đơn hàng 249.000đ
            </div>
          </div>
          <div className="ml-2 flex pt-5">
            <div>
              <Button className="mr-10 h-[50px] w-[200px] bg-blue-500 text-sm font-semibold text-white">
                THÊM VÀO GIỎ HÀNG
              </Button>
            </div>
            <div>
              <Button className=" h-[50px] w-[200px] bg-orange-500 text-sm font-semibold text-white">
                MUA NGAY
              </Button>
            </div>
          </div>
          <div>
            <Button className=" ml-2 mt-4 h-[50px] w-[200px] bg-blue-500 text-sm font-semibold text-white">
              <div>THANH TOÁN ONLINE</div>
              <div className="text-xs">Mua hàng đảm bảo </div>
            </Button>
          </div>
          <div className="flex justify-between">
            <div className="ml-2 flex pt-5">
              <div className=" py-none items-center rounded-full border-2 border-gray-400 px-3 text-center text-[50px] text-gray-400">
                <TruckOutlined />
              </div>
              <div className="ml-3 w-[100px] items-center pt-3 text-left text-xl">
                Giao hàng toàn quốc
              </div>
            </div>
            <div className="ml-2 flex pt-5">
              <div className=" py-none items-center rounded-full border-2 border-gray-400 px-3 text-center text-[50px] text-gray-400">
                <InteractionOutlined />
              </div>
              <div className="ml-3 w-[150px] items-center pt-3 text-left text-xl">
                Đổi hàng 15 ngày miễn phí
              </div>
            </div>
            <div className="ml-2 flex pt-5">
              <div className=" py-none  items-center rounded-full border-2 border-gray-400 px-3 text-center text-[50px] text-gray-400">
                <SafetyOutlined />
              </div>
              <div className="ml-3 w-[150px] items-center pt-3 text-left text-xl">
                Đảm bảo hàng chính hãng
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ml-72 mt-5 min-h-[150px] w-[900px] justify-center rounded-2xl bg-white">
        <div className="ml-2 flex items-center py-3 text-2xl">
          <p className=" ml-2 mr-10 font-bold">Mô tả sản phẩm</p>
        </div>

        <div className="mx-2 bg-white text-lg">
          <div className="ml-2">
            <p>{product.description}</p>
          </div>
        </div>
      </div>
      <div className="ml-72 mt-5 h-[290px] w-[900px] justify-center rounded-2xl bg-white">
        <div className="items-center justify-center justify-items-center rounded-full py-3 text-2xl font-bold">
          <div className="ml-3 text-blue-500">Thông số sản phẩm</div>
        </div>
        <div className="ml-3 mt-5">
          <div className="mb-5 mr-2 flex rounded-full bg-blue-200 py-2 text-xl">
            <div className="ml-2 w-[400px] font-semibold">Xuất xứ</div>
            <div>Thái Lan</div>
          </div>
          <div className="mb-5 flex text-xl">
            <div className="ml-2 w-[400px] font-semibold">Dung tích</div>
            <div>600ml</div>
          </div>
          <div className="mb-5 mr-2 flex rounded-full bg-blue-200 py-2 text-xl">
            <div className="ml-2 w-[400px] font-semibold">
              Kích thước (bao bì)
            </div>
            <div>14.5x5x21.7cm</div>
          </div>
          <div className="flex text-xl">
            <div className="ml-2 w-[400px] font-semibold">Bán chạy nhất</div>
            <div>1848</div>
          </div>
        </div>
      </div>
      <div className="ml-72 mt-5 h-[900px] w-[900px] rounded-2xl bg-white">
        <div>
          <div className="ml-3 pt-3 ">
            <button
              onClick={handleShowModal}
              className=" h-[60px] w-[380px] rounded-2xl border border-[#11C3C3] bg-white text-xl font-semibold text-[#11C3C3] hover:border  hover:border-blue-700"
              title="Give Feedback"
              type="button"
            >
              Nhấn vào để cho nhận xét và đánh giá
            </button>
            <Modal open={openModal} onCancel={handleCancel} onOk={handleOk}>
              <div className="mt-6 h-[80px] content-center bg-[#11C3C3] text-center text-xl text-white">
                Hãy cho chúng tôi đánh giá của bạn
              </div>
              <Form>
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <button
                      className="h-[55px] w-[45px] text-[42px] text-red-500"
                      title="Không hài lòng"
                      type="button"
                    >
                      <FrownOutlined />
                    </button>
                    <button
                      className="ml-1 mt-3 text-red-500"
                      title="Không hài lòng"
                      type="button"
                    >
                      Không hài lòng
                    </button>
                  </div>
                  <div className="flex items-center">
                    <button
                      className="h-[55px] w-[45px] text-[42px] text-blue-500"
                      title="Hài lòng"
                      type="button"
                    >
                      <MehOutlined />
                    </button>
                    <button
                      className="ml-1 mt-3 text-blue-500"
                      title="Hài lòng"
                      type="button"
                    >
                      Hài lòng
                    </button>
                  </div>
                  <div className="flex items-center">
                    <button
                      className="h-[55px] w-[45px] text-[42px] text-teal-500"
                      title="Rất hài lòng"
                      type="button"
                    >
                      <SmileOutlined />
                    </button>
                    <button
                      className="ml-1 mt-3 text-teal-500"
                      title="Rất hài lòng"
                      type="button"
                    >
                      Rất hài lòng
                    </button>
                  </div>
                </div>
                <div className="mt-6">
                  <span className="text-lg">
                    Điều bạn thích/không thích về sản phẩm của chúng tôi*
                  </span>
                  <input
                    type="text"
                    className="h-28 w-[470px] border border-black pb-20 text-left text-base"
                    placeholder="Nhập ở đây"
                  />
                </div>
              </Form>
            </Modal>
          </div>
        </div>
        <div className="ml-3 flex justify-between border-b-2 pb-5 text-lg">
          <div className="pt-4 font-bold">99 bình luận</div>
          <div className="pt-4">Xem bình luận có đánh giá</div>
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Tìm theo nội dụng người gửi"
              className=" w-60 border  p-2 pl-2 pr-8 text-sm"
            />
            <SearchOutlined className="absolute right-2 text-gray-500" />
          </div>
        </div>
        <div className="ml-3 pt-6">
          {comments.map((comment) => (
            <div key={comment.id} className="mb-4">
              <div className="flex items-center">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwP-38HZT6Vl1LXeFxOsB0PS1SFOOtyu1XW_R-_cMW8VoQZInsRpCskTldMltmaq1bt3o&usqp=CAU"
                  alt=""
                  className="h-8 w-8"
                />
                <div className="ml-2 font-bold">{comment.username}</div>
              </div>
              <div className="max-w-full break-words">{comment.content}</div>
              <div className="flex w-[220px] items-center justify-between">
                <button
                  className="text-left text-blue-600"
                  onClick={() => handleReplyClick(comment.id)}
                >
                  Trả lời
                </button>
                <button className="text-left text-blue-600">Thích(2)</button>
                <div className="text-left text-xs text-gray-400 ">
                  {comment.date}
                </div>
              </div>
              {replyInputs[comment.id] && (
                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="Nhập bình luận của bạn"
                    className="mb-2 w-full border px-2 py-5"
                  />
                  <button
                    className="w-full border bg-blue-500 p-2 text-white"
                    onClick={() => handleSendReply(comment.id)}
                  >
                    Gửi
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
