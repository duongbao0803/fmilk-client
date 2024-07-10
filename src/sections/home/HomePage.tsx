import React, { useCallback } from "react";
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import { Carousel, notification, Skeleton } from "antd";
import Intro from "./Intro";
import Slider from "./Slider";
import useProductService from "@/services/productService";
import { ProductInfo } from "@/interfaces/interface";
import { PriceFormat } from "@/util/validate";
import useCartStore from "@/hooks/useCartStore";

const HomePage: React.FC = React.memo(() => {
  const { products } = useProductService();
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddtoCart = useCallback(
    (product: ProductInfo) => {
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

  return (
    <>
      <div className="min-h-screen">
        <Header />
        <Carousel autoplay>
          <div className="background" />
          <div className="background2" />
        </Carousel>
      </div>
      <Intro />
      <div className="mx-16 mt-20 py-4 lg:mx-44">
        <div className="mb-10 flex justify-center" data-aos="fade-down">
          <span className="border-b-2 border-[#1385b7] border-x-[#1385b7] text-center text-[25px] font-medium text-[#1385b7]">
            SẢN PHẨM
          </span>
        </div>
        <div
          className="productList mb-24 grid grid-cols-1 gap-10 transition-all duration-700 ease-in-out sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          data-aos="fade-right"
        >
          {products.length > 0
            ? products.map((product: ProductInfo, index: number) => (
                <div
                  key={product._id}
                  data-aos="fade-right"
                  data-aos-delay={`${index * 150}`}
                  className="product-item cursor-pointer rounded-lg border-[0.5px] bg-white shadow-md transition-all duration-700 ease-in-out hover:shadow-lg"
                >
                  <div className="flex h-full flex-col items-center justify-center transition-all duration-700 ease-in-out">
                    <div className="group relative w-full overflow-hidden">
                      <img
                        src={product?.image}
                        alt={product?.name}
                        className="h-full w-full object-cover p-3 transition-all duration-300 ease-in-out group-hover:scale-110"
                      />
                      <button className="absolute bottom-0 flex h-full w-full items-center justify-center bg-gray-800 bg-opacity-50 opacity-0 transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:transform group-hover:opacity-100">
                        <p className="text-md mx-5 border-2 p-2 font-semibold text-[#fff] hover:bg-[#fff] hover:text-black xl:text-lg">
                          <button onClick={() => handleAddtoCart(product)}>
                            + Thêm vào giỏ hàng
                          </button>
                        </p>
                      </button>
                    </div>

                    <div className="flex flex-col items-center p-4 text-center">
                      <h3 className="mb-2 text-lg font-semibold">
                        {product?.name}
                      </h3>
                      <p className="mb-2">
                        <span className="font-bold">Xuất xứ:</span>{" "}
                        <span className="font-bold text-red-500">
                          {product?.origin}
                        </span>
                      </p>
                      <p className="mb-2 text-xl font-bold ">
                        <span className="text-red-500">
                          {PriceFormat.format(product.price ?? 0)}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              ))
            : Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="rounded-lg border-[0.2px] border-[#e6e6e6] p-5"
                >
                  <Skeleton loading={true} active />
                </div>
              ))}
        </div>
        <div>
          <Slider />
        </div>
      </div>
      <Footer />
    </>
  );
});

export default HomePage;
