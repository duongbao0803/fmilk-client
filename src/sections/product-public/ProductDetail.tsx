import { Role } from "@/enums/enum";
import useAuth from "@/hooks/useAuth";
import useCartStore from "@/hooks/useCartStore";
import { ProductInfo } from "@/interfaces/interface";
import Footer from "@/layout/Footer";
import Header from "@/layout/Header";
import useProductService from "@/services/productService";
import { PriceFormat } from "@/util/validate";
import {
  CarFilled,
  ClockCircleOutlined,
  EuroCircleFilled,
  HomeFilled,
  RightOutlined,
} from "@ant-design/icons";
import {
  Divider,
  Form,
  Image,
  Input,
  Modal,
  notification,
  Progress,
  Rate,
} from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ProductDetail: React.FC = () => {
  const { productId } = useParams();
  const { getInfoProductDetail } = useProductService("", "");

  const [product, setProduct] = useState<ProductInfo>();
  const [star, setStar] = useState<number>(5);
  const addToCart = useCartStore((state) => state.addToCart);
  const { TextArea } = Input;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { infoUser } = useAuth();

  const formattedPrice =
    product?.price !== undefined ? PriceFormat.format(product.price) : "";

  useEffect(() => {
    if (productId) {
      const fetchData = async () => {
        try {
          const res = await getInfoProductDetail(productId);
          setProduct(res);
        } catch (err) {
          console.error("Err fetching detail product", err);
        }
      };
      fetchData();
    }
  }, [productId]);

  const handleAddtoCart = useCallback(
    (product: ProductInfo) => {
      if (infoUser?.role === Role.ADMIN || infoUser?.role === Role.STAFF) {
        notification.warning({
          message: "Thêm giỏ hàng thất bại",
          description: "Bạn không có quyền mua hàng",
          duration: 2,
        });
        return;
      }
      addToCart(product);
      notification.success({
        message: "Thêm giỏ hàng thành công",
        description: (
          <span>
            Bạn đã thêm{" "}
            <strong className="text-[#1385b7]">{product?.name}</strong> vào giỏ
            hàng
          </span>
        ),
        duration: 2,
      });
    },
    [addToCart],
  );

  const handleStar = (values: number) => {
    setStar(values);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#f5f5f5] px-10 pb-16 md:px-52">
        <div className="mb-5 pt-28">
          <Link to={"/"}>
            <HomeFilled className="text-xl text-[#08cde9]" />
          </Link>
          <RightOutlined className="mx-2 text-[#08cde9]" />
          <span className="font-bold">Chi tiết sản phẩm</span>
          <div className="mt-3 flex justify-center gap-16 rounded-xl bg-[#fff] py-5">
            <div>
              <Image width={500} src={product?.image} />
            </div>
            <div className="flex flex-col gap-5">
              <strong className="mb-0 text-[30px]">{product?.name}</strong>
              <div className="flex gap-2">
                <span className="border-b-2 border-[#08cde9] text-[#2db4c6]">
                  {star}
                </span>
                <Rate allowHalf value={star} onChange={handleStar} />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[18px] font-bold">Xuất xứ:</span>
                <span className="font-bold text-[#08cde9]">
                  {product?.brand?.origin}
                </span>
              </div>
              <div>
                <span className="text-4xl">{formattedPrice}</span>
              </div>
              <button
                onClick={() => product && handleAddtoCart(product)}
                className="w-full border-2 bg-[#08cde9] py-3 font-bold text-[white] transition-all duration-500 ease-in-out hover:rounded-2xl hover:border-[#08cde9] hover:bg-[white] hover:tracking-widest hover:text-[#08cde9]"
              >
                Thêm giỏ hàng
              </button>
              <div className="rounded-xl border-2 px-5 py-3">
                <p className="mb-2 font-bold">CHÍNH SÁCH BÁN HÀNG</p>
                <div>
                  <CarFilled className="mr-1 text-[#08cde9]" />
                  <span className="mr-1 text-sm font-bold text-[#08cde9]">
                    Miến phí ship
                  </span>
                  <span className="text-sm text-[#9a9898]">
                    (Cho đơn hàng trên 3.000.000 đ)
                  </span>
                </div>

                <div>
                  <EuroCircleFilled className="mr-1 text-[#08cde9]" />
                  <span className="mr-1 text-sm font-bold text-[#08cde9]">
                    Thanh toán
                  </span>
                  <span className="text-sm text-[#9a9898]">
                    (Banking/VNPAY/COD)
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 rounded-xl bg-[#fff] p-5">
            <p className="font-bold">Đặc điểm nổi bật</p>
            <p>{product?.description}</p>
          </div>
          <div className="mt-5 rounded-xl bg-[#fff] p-5">
            <p className="font-bold">
              Đánh giá & nhận xét {product?.name} - Chỉ có tại{" "}
              <span className="text-[#08cde9]">FMilk</span>
            </p>
            <div className="my-3 grid grid-cols-1 gap-10 px-2 py-3 md:grid-cols-3">
              <div className="relative col-span-1 flex items-center justify-center">
                <div className="flex flex-col items-center justify-center gap-2">
                  <p className="text-xl font-bold">4.0/5.0</p>
                  <Rate allowHalf value={star} onChange={handleStar} />
                  <p className="">
                    <span className="font-bold">1</span> đánh giá
                  </p>
                </div>
                <div className="absolute right-4 h-full w-[1px] bg-[#e8eaed]" />
              </div>
              <div className="col-span-2 ">
                <div className="">
                  <div className="mb-2 flex">
                    <span>
                      5<Rate allowHalf count={1} value={1} className="mx-1" />
                    </span>

                    <Progress
                      percent={30}
                      size="small"
                      showInfo={false}
                      className="w-[75%]"
                    />
                    <span className="ml-2 text-sm">1 đánh giá</span>
                  </div>
                  <div className="mb-2 flex">
                    <span>
                      4<Rate allowHalf count={1} value={1} className="mx-1" />
                    </span>
                    <Progress
                      percent={30}
                      size="small"
                      showInfo={false}
                      className="w-[75%]"
                    />
                    <span className="ml-2 text-sm">1 đánh giá</span>
                  </div>
                  <div className="mb-2 flex">
                    <span>
                      3<Rate allowHalf count={1} value={1} className="mx-1" />
                    </span>
                    <Progress
                      percent={30}
                      size="small"
                      showInfo={false}
                      className="w-[75%]"
                    />{" "}
                    <span className="ml-2 text-sm">1 đánh giá</span>
                  </div>
                  <div className="mb-2 flex">
                    <span>
                      2<Rate allowHalf count={1} value={1} className="mx-1" />
                    </span>
                    <Progress
                      percent={30}
                      size="small"
                      showInfo={false}
                      className="w-[75%]"
                    />
                    <span className="ml-2 text-sm">1 đánh giá</span>
                  </div>
                  <div className="mb-2 flex">
                    <span>
                      1<Rate allowHalf count={1} value={1} className="mx-1" />
                    </span>
                    <Progress
                      percent={30}
                      size="small"
                      showInfo={false}
                      className="w-[75%]"
                    />
                    <span className="ml-2 text-sm">1 đánh giá</span>
                  </div>
                </div>
              </div>
            </div>
            <Divider />
            {infoUser?.role === Role.MEMBER && (
              <div className="flex flex-col items-center justify-center gap-3">
                <p>Bạn đánh giá sao về sản phẩm này ?</p>
                <button
                  className="rounded-md bg-[#08cde9] px-[30px] py-[10px] text-[#fff]"
                  onClick={() => setIsOpen(true)}
                >
                  Đánh giá ngay
                </button>
              </div>
            )}
            <Divider />
            <div className="grid grid-cols-12">
              <div className="col-span-1 h-[50px] w-[50px]  rounded-full object-cover">
                <img
                  className="rounded-full object-cover"
                  src="https://yt3.googleusercontent.com/2rIW6m-ZDdTDITm0VpttLYxR9onL699oB1XBF-apHCjxfl88D7vA4jMTog499zSlQ_pBF8Y_WA=s900-c-k-c0x00ffffff-no-rj"
                  alt="lỗi"
                />
              </div>
              <div className="col-span-11 flex flex-col gap-3">
                <div>
                  <span className="mr-1 text-lg font-bold">Dương bảo</span>{" "}
                  <span className="text-[13px] text-[#757575]">
                    <ClockCircleOutlined />
                    17/07/2024
                  </span>
                </div>
                <Rate value={5} count={5} className="text-[16px]" />
                <p className="text-[15px]">Sữa ngon sữa ngọt</p>
              </div>
            </div>
          </div>
          <div>
            <Modal
              title={<p className="text-red text-lg">Đánh giá & nhận xét</p>}
              open={isOpen}
              onCancel={() => setIsOpen(false)}
              footer={[
                <button
                  key="customButton"
                  className="w-full rounded-md bg-[#08cde9] py-2 font-bold text-[#fff]"
                >
                  GỬI ĐÁNH GIÁ
                </button>,
              ]}
            >
              <Form name="normal_login" className="login-form">
                <Form.Item
                  name="rating"
                  rules={[
                    {
                      required: true,
                      message: "Please input rating",
                    },
                  ]}
                  colon={true}
                  labelCol={{ span: 24 }}
                  className="formItem"
                >
                  <div className="">
                    <div className="flex gap-3">
                      <img
                        src={product?.image}
                        alt=""
                        className="h-[100px] w-[100px]"
                      />
                      <span className="pt-5 text-lg font-bold">
                        {product?.name}
                      </span>
                    </div>
                    <div className="mt-7">
                      <p className="mb-2 font-bold">Đánh giá chung</p>
                      <Rate
                        allowHalf
                        value={star}
                        onChange={handleStar}
                        className="text-center text-4xl"
                      />
                    </div>
                  </div>
                </Form.Item>
                <Form.Item
                  name="content"
                  rules={[
                    {
                      required: true,
                      message: "Please input content",
                    },
                    {
                      min: 8,
                      message: "Content must be at least 8 characters",
                    },
                  ]}
                  colon={true}
                  label="Nhận xét"
                  labelCol={{ span: 24 }}
                  className="formItem"
                >
                  <TextArea placeholder="Gửi nhận xét" rows={3} />
                </Form.Item>
              </Form>
            </Modal>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProductDetail;
