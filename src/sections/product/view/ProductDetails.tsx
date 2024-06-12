import Header from "@/layout/Header";
import { FrownOutlined, MehOutlined, SmileOutlined } from "@ant-design/icons";
import { Button, Form, Modal } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductDetailsPage() {
  const [products, setProducts] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `https://fmilk-server.onrender.com/api/v1/product/${id}`,
        );
        console.log("data", response);
        setProducts(response.data.productInfo);
      } catch (error) {
        console.error("Error fetching the products:", error);
      }
    };

    fetchProducts();
  }, [id]);

  const [quantity, setQuantity] = useState(1);
  const [openModal, setOpenModal] = useState(false);

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleShowModal = () => {
    setOpenModal(true);
  };

  const handleOk = () => {
    setOpenModal(false);
  };

  const handleCancel = () => {
    setOpenModal(false);
  };

  return (
    <div className="bg-gray-100">
      <Header />
      <div className="flex">
        <div className=" ml-72 flex w-[900px] items-center rounded-2xl bg-white ">
          <div className=" items-center">
            <div className="relative h-[400px] w-[300px]">
              <img
                src={products.image}
                alt="Product"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="">
            <h1 className="ml-2 mt-10 w-[800px] items-center text-4xl font-bold text-blue-700">
              {products.name}
            </h1>
            <h3 className="ml-2 mt-4 text-2xl">Rating:{products.rating}</h3>
            <div className="ml-2 mt-5 flex w-[300px] justify-start rounded-lg bg-rose-200">
              <p className="ml-2 text-4xl font-medium text-black">
                {products.price}
              </p>
            </div>
            <div className="ml-2 mt-4 flex items-center">
              <p className="mr-5 text-xl">Chọn Số Lượng</p>
              <Button
                onClick={decreaseQuantity}
                className="bg-white px-4 py-1 text-black"
                aria-label="Decrease Quantity"
              >
                -
              </Button>
              <span className="mx-4 mr-4 text-2xl">{quantity}</span>
              <Button
                onClick={increaseQuantity}
                className="bg-white px-4 py-1 text-black"
                aria-label="Increase Quantity"
              >
                +
              </Button>
            </div>
            <div className="ml-2 mt-10 flex">
              <div>
                <Button className="mr-10 h-[70px] w-[250px] rounded-3xl bg-rose-300 text-xl font-semibold">
                  THÊM VÀO GIỎ HÀNG
                </Button>
              </div>
              <div>
                <Button
                  style={{ width: "250px", height: "70px" }}
                  className="rounded-3xl bg-blue-200 text-xl font-semibold text-black"
                >
                  MUA NGAY
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ml-72 mt-5 min-h-[150px] w-[900px] justify-center rounded-2xl bg-white">
        <div className="ml-2 flex items-center py-3 text-2xl">
          <p className=" ml-2 mr-10 font-bold">Mô tả sản phẩm</p>
        </div>

        <div className=" mx-2 bg-white text-lg">
          <div className="ml-2">
            <p>{products.description}</p>
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
      <div className="ml-72 mt-5  w-[900px] justify-center rounded-2xl">
        <div>
          <div className="ml-3 place-content-end pb-8 pt-3 text-center">
            <button
              onClick={handleShowModal}
              style={{ width: "150px", height: "60px" }}
              className="rounded-2xl border border-[#11C3C3] bg-white text-xl font-semibold text-[#11C3C3] hover:border  hover:border-blue-700"
            >
              Give Feedback
            </button>
            <Modal open={openModal} onCancel={handleCancel} onOk={handleOk}>
              <div className="mt-6 h-[80px] content-center bg-[#11C3C3] text-center text-xl text-white">
                Hãy cho chúng tôi đánh giá của bạn
              </div>
              <Form>
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <button className="h-[55px] w-[45px] text-[42px] text-teal-500 ">
                      <FrownOutlined />
                    </button>
                    <button className="ml-1 mt-3 text-teal-500">
                      Không hài lòng
                    </button>
                  </div>
                  <div className="flex items-center">
                    <button className="h-[55px] w-[45px] text-[42px] text-blue-500">
                      <MehOutlined />
                    </button>
                    <button className="ml-1 mt-3 text-blue-500">
                      Hài lòng
                    </button>
                  </div>
                  <div className="flex items-center">
                    <button className="h-[55px] w-[45px] text-[42px] text-rose-500">
                      <SmileOutlined />
                    </button>
                    <button className="ml-1 mt-3 text-rose-500">
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
                    className="h-28 w-[470px] border border-black pb-20 text-left text-base "
                  />
                </div>
              </Form>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
