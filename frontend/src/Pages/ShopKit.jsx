import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";



const ShopKit = () => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);

  const base = import.meta.env.BASE_URL;
  
  const priceMap = { "23": 45, "33": 65, "53": 85 };
  const pricePerKit = selectedSize ? priceMap[selectedSize] : 0;

  const addQuantity = () => setQuantity((prev) => prev + 1);
  const removeQuantity = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
    else toast.error("Quantity can't go below 1");
  };

  const handleOrderNow = () => {
    if (!selectedSize) return toast.error("Select a bear size first");
    const orderData = {
      itemName: "BearTok Creativity Kit",
      size: selectedSize,
      quantity,
      price: pricePerKit * quantity,
    };
    navigate("/checkout", { state: { product: orderData } });
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center px-4 sm:px-6 py-10">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/Bg2.jpg)` }}
      />
      <div className="absolute inset-0 bg-black/30" />

      <h1 className="text-3xl sm:text-4xl font-bold text-white z-10 mb-6">Shop Kits</h1>

      <div className="relative z-10 bg-black/70 backdrop-blur-xl border p-4 sm:p-6 md:p-8 rounded-3xl shadow-lg max-w-3xl w-full">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <img
            src={`${base}images/Item1.jpg`}
            className="w-full sm:w-80 h-56 object-cover rounded-2xl border"
          />

          <div className="flex-1 flex flex-col gap-4 text-white">
            <h2 className="text-2xl font-semibold text-pink-600">BearTok Creativity Kit</h2>
            <p className="text-sm sm:text-base">Includes: Fluid Bear, 4 bottles of 8oz paint, and Gloves</p>

            {/* Size Selector */}
            <ul className="space-y-2 mt-2">
              {["23", "33", "53"].map((size) => (
                <li key={size} className="flex items-center gap-3 text-sm sm:text-base">
                  <input
                    type="radio"
                    name="size"
                    value={size}
                    checked={selectedSize === size}
                    onChange={() => setSelectedSize(size)}
                    className="accent-amber-600 w-5 h-5"
                  />
                  <span>{size}cm bears - ${priceMap[size]}</span>
                </li>
              ))}
            </ul>

            {/* Quantity */}
            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={removeQuantity}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
              >
                -
              </button>
              <span className="text-white">Quantity: {quantity}</span>
              <button
                onClick={addQuantity}
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
              >
                +
              </button>
            </div>

            {/* Total & Order Now */}
            <div className="mt-4">
              <p className="text-xl sm:text-2xl font-bold">Total: ${pricePerKit * quantity}</p>
              <button
                onClick={handleOrderNow}
                className="mt-2 w-full sm:w-auto bg-blue-700 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition"
              >
                Order Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopKit;
