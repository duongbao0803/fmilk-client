import React, { useEffect, useState } from "react";
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import axios from "axios";
import { Carousel } from "antd";
import Intro from "./Intro";
import Slider from "./Slider";

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
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://fmilk-server.onrender.com/api/v1/product/",
        );
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching the products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleBuyNow = (productId: string) => {
    console.log("Buy now clicked for product with ID:", productId);
  };

  const handleAddToCart = (productId: string) => {
    const product = products.find((p) => p._id === productId);
    if (product) {
      setCart((prevCart) => {
        const existingItem = prevCart.find((item) => item._id === productId);
        if (existingItem) {
          return prevCart.map((item) =>
            item._id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          );
        } else {
          return [...prevCart, { ...product, quantity: 1 }];
        }
      });
      showNotification("Thêm Vào Giỏ Hàng Thành Công");
    }
  };

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const renderStars = (rating: number) => {
    const totalStars = 5;
    const stars = [];
    for (let i = 1; i <= totalStars; i++) {
      if (i <= rating) {
        stars.push(
          <span key={i} className="text-yellow-500">
            &#9733;
          </span>,
        );
      } else {
        stars.push(
          <span key={i} className="text-gray-400">
            &#9733;
          </span>,
        );
      }
    }
    return stars;
  };


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
      <Intro />
      <div className="container mx-auto mt-20 px-20 py-4">
        <div className="mb-10 flex justify-center" data-aos="fade-down">
          <span className="border-b-2 border-[#1385b7] border-x-[#1385b7] text-center text-[25px] font-medium text-[#1385b7]">
            SẢN PHẨM
          </span>
        </div>
        <div className="mb-24 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product._id}
                className="product-item rounded-lg bg-white shadow-md"
              >
                <div className="flex h-full flex-col justify-between">
                  <div className="aspect-w-1 aspect-h-1">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col items-center p-4 text-center">
                    <h3 className="mb-2 text-lg font-semibold">
                      {product.name}
                    </h3>
                    <p className="mb-2 text-gray-600">{product.description}</p>
                    <p className="mb-2 font-bold text-gray-800">
                      Price: {product.price}
                    </p>
                    <div className="mb-4">
                      Rating: {renderStars(product.rating)}
                    </div>
                    <button
                      onClick={() => handleAddToCart(product._id)}
                      className="mb-2 w-full rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => handleBuyNow(product._id)}
                      className="w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Loading products...</p>
          )}
        </div>
        <div>
          <Slider />
        </div>
      </div>
      {notification && (
        <div className="fixed bottom-4 left-4 bg-green-500 text-black py-4 px-6 rounded-md flex items-center shadow-lg z-50">
          <span>&#10003;</span>
          <span className="ml-2 font-semibold">{notification}</span>
        </div>
      )}
      <Footer />
    </>
  );
};

export default HomePage;
