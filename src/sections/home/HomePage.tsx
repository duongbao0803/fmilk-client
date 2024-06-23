import React, { useEffect, useState } from "react";
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import axios from "axios";
import { Link } from "react-router-dom";

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

  console.log("products", products);

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

  const truncateDescription = (description: string, wordLimit: number) => {
    const words = description.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return description;
  };

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product._id}
                className="product-item overflow-hidden rounded-lg bg-white shadow-md"
              >
                <div className="flex h-full flex-col justify-between">
                  <div className="relative" style={{ paddingBottom: "75%" }}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="absolute left-0 top-0 h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col items-center p-2 text-center">
                    <h3 className="mb-1 text-lg font-semibold">
                      {product.name}
                    </h3>
                    <p className="mb-1 text-gray-600">
                      {truncateDescription(product.description, 10)}
                    </p>
                    <p className="mb-1 font-bold text-gray-800">
                      Price: {product.price}
                    </p>
                    <div className="mb-2">
                      Rating: {renderStars(product.rating)}
                    </div>
                    <button
                      onClick={() => handleAddToCart(product._id)}
                      className="mb-1 w-full rounded bg-green-500 px-2 py-1 font-bold text-white hover:bg-green-700"
                    >
                      Add to Cart
                    </button>
                    <Link
                      to={`/productdetails/${product._id}`}
                      onClick={() => handleBuyNow(product._id)}
                      className="w-full rounded bg-blue-500 px-2 py-1 font-bold text-white hover:bg-blue-700"
                    >
                      Buy Now
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Loading products...</p>
          )}
        </div>
      </div>
      {notification && (
        <div className="fixed bottom-4 left-4 z-50 flex items-center rounded-md bg-green-500 px-6 py-4 text-black shadow-lg">
          <span>&#10003;</span>
          <span className="ml-2 font-semibold">{notification}</span>
        </div>
      )}
      <Footer />
    </>
  );
};

export default HomePage;
