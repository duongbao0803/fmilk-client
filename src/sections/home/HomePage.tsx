import React, { useEffect, useState } from "react";
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import { Carousel, Skeleton } from "antd";
import Intro from "./Intro";
import Slider from "./Slider";
import useProductService from "@/services/productService";
import { ProductInfo } from "@/interfaces/interface";
import { PriceFormat } from "@/util/validate";

interface Product {
  _id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  rating: number;
}

interface CartItem extends Product {
  quantity: number;
}

const HomePage: React.FC = () => {
  const { products } = useProductService();
  const [cart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  console.log("re-render");

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // const handleBuyNow = (productId: string) => {
  //   console.log("Buy now clicked for product with ID:", productId);
  // };

  // const handleAddToCart = (productId: string) => {
  //   const product = products.find((p: { _id: string }) => p._id === productId);
  //   if (product) {
  //     setCart((prevCart) => {
  //       const existingItem = prevCart.find((item) => item._id === productId);
  //       if (existingItem) {
  //         return prevCart.map((item) =>
  //           item._id === productId
  //             ? { ...item, quantity: item.quantity + 1 }
  //             : item,
  //         );
  //       } else {
  //         return [...prevCart, { ...product, quantity: 1 }];
  //       }
  //     });
  //   }
  // };

  // const renderStars = (rating: number) => {
  //   const totalStars = 5;
  //   const stars = [];
  //   for (let i = 1; i <= totalStars; i++) {
  //     if (i <= rating) {
  //       stars.push(
  //         <span key={i} className="text-yellow-500">
  //           &#9733;
  //         </span>,
  //       );
  //     } else {
  //       stars.push(
  //         <span key={i} className="text-gray-400">
  //           &#9733;
  //         </span>,
  //       );
  //     }
  //   }
  //   return stars;
  // };

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
            ? products.map((product: ProductInfo) => (
                <div
                  key={product._id}
                  className="product-item cursor-pointer rounded-lg border-[0.5px] bg-white shadow-md transition-all duration-700 ease-in-out hover:shadow-lg"
                >
                  <div className="flex h-full flex-col items-center justify-center transition-all duration-700 ease-in-out">
                    <div className="group relative w-full overflow-hidden">
                      <img
                        src={product?.image}
                        alt={product?.name}
                        className="h-full w-full object-cover p-3 transition-all duration-300 ease-in-out group-hover:scale-110"
                      />
                      <button
                        // onClick={() => handleAddToCart(productId)}
                        className="absolute bottom-0 flex h-full w-full items-center justify-center bg-gray-800 bg-opacity-50 opacity-0 transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:transform group-hover:opacity-100"
                      >
                        <p className="text-md mx-5 border-2 p-2 font-semibold text-[#fff] hover:bg-[#fff] hover:text-black xl:text-lg">
                          + Thêm vào giỏ hàng
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

                      {/* <button
                        onClick={() => handleAddToCart(product?._id)}
                        className="mb-2 w-full rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={() => handleBuyNow(product._id)}
                        className="w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                      >
                        Buy Now
                      </button> */}
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
};

export default HomePage;
