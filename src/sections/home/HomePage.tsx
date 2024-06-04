import React, { useEffect, useState } from "react";
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import axios from "axios";

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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fmilk-server.onrender.com/api/v1/product/");
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
              : item
          );
        } else {
          return [...prevCart, { ...product, quantity: 1 }];
        }
      });
    }
  };

  const renderStars = (rating: number) => {
    const totalStars = 5;
    const stars = [];
    for (let i = 1; i <= totalStars; i++) {
      if (i <= rating) {
        stars.push(<span key={i} className="text-yellow-500">&#9733;</span>);
      } else {
        stars.push(<span key={i} className="text-gray-400">&#9733;</span>);
      }
    }
    return stars;
  };

  return (
    <>
      <Header />
      <div className="container mx-auto px-20 py-4">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product._id} className="product-item bg-white shadow-md rounded-lg overflow-hidden">
                <div className="flex flex-col justify-between h-full">
                  <div className="aspect-w-1 aspect-h-1">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4 flex flex-col items-center text-center">
                    <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-2">{product.description}</p>
                    <p className="text-gray-800 font-bold mb-2">Price: {product.price}</p>
                    <div className="mb-4">
                      Rating: {renderStars(product.rating)}
                    </div>
                    <button onClick={() => handleAddToCart(product._id)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full mb-2">
                      Add to Cart
                    </button>
                    <button onClick={() => handleBuyNow(product._id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
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
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
