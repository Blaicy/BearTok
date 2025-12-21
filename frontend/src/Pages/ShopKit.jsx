import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ShopKit = () => {
  const navigate = useNavigate();
  const base = import.meta.env.BASE_URL;

  // --- State ---
  const [kitQuantity, setKitQuantity] = useState(1);
  const [selectedKitSize, setSelectedKitSize] = useState(null);
  const [kitColors, setKitColors] = useState([]);

  const kitPriceMap = { "23": 45, "33": 65, "53": 85 };
  const kitPrice = selectedKitSize ? kitPriceMap[selectedKitSize] : 0;

  // --- Simplified Total Calculation ---
  const total = useMemo(() => {
    return kitPrice * kitQuantity;
  }, [kitPrice, kitQuantity]);

  // --- Handlers ---
  const toggleKitColor = (color) => {
    setKitColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const handleKitQuantityChange = (type) => {
    if (!selectedKitSize) {
      toast.error("Select a Bear size first");
      return;
    }
    setKitQuantity((prev) => (type === "add" ? prev + 1 : Math.max(1, prev - 1)));
  };

  const handleOrderNow = () => {
    // Validation: Only check for Kit selection now
    if (!selectedKitSize) {
      return toast.error("Please select a Bear size!");
    }

    // Prepare Order Data structure for Checkout
    const orderData = {
      products: [
        {
          itemName: "BearTok Creativity Kit",
          size: selectedKitSize,
          quantity: kitQuantity,
          colors: kitColors.length ? kitColors : ["Any"],
          price: kitPrice * kitQuantity,
        },
      ],
      total: total,
      price: total, // Used for Stripe PaymentIntent amount
    };

    navigate("/checkout", { state: { product: orderData } });
  };

  return (
    <div className="relative flex flex-col items-center min-h-screen px-4 py-10 sm:px-6 bg-gray-50">
      {/* Background */}
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{ backgroundImage: `url(${base}images/Bg2.jpg)` }}
      />
      <div className="absolute inset-0 bg-black/30" />

      {/* Header */}
      <h1 className="z-10 mb-6 text-3xl font-bold text-white sm:text-4xl">
        Shop Creativity Kits
      </h1>

      <div className="relative z-10 w-full max-w-4xl p-6 space-y-8 border shadow-lg bg-white/80 backdrop-blur-xl rounded-3xl">
        <div className="flex flex-col items-center gap-6 md:flex-row">
          {/* Item Image */}
          <img
            src={`${base}images/Item1.jpg`}
            alt="BearKit"
            className="object-cover w-full h-56 border border-gray-300 shadow-md md:w-80 rounded-2xl"
          />

          {/* Item Details */}
          <div className="flex flex-col flex-1 gap-4 text-gray-800">
            <h2 className="text-2xl font-semibold text-pink-600">
              BearTok Creativity Kit
            </h2>
            <p className="text-sm sm:text-base">
              Includes: Fluid Bear, 4 bottles of 8oz paint, and Gloves
            </p>

            {/* Size Selection */}
            <span className="text-sm font-semibold">Select Bear Size:</span>
            <ul className="mt-2 space-y-2">
              {["23", "33", "53"].map((size) => (
                <li key={size} className="flex items-center gap-3 text-sm sm:text-base">
                  <input
                    type="radio"
                    name="kitSize"
                    value={size}
                    checked={selectedKitSize === size}
                    onChange={() => setSelectedKitSize(size)}
                    className="w-5 h-5 accent-amber-600"
                  />
                  <span>{size}cm bears - ${kitPriceMap[size]}</span>
                </li>
              ))}
            </ul>

            {/* Paint Colors */}
            <span className="block mt-2 text-sm font-semibold">Select Paint Colors:</span>
            <div className="flex flex-wrap gap-2 mt-1">
              {["pink", "yellow", "blue", "red","green","black","purple"].map((color) => {
                const colorClasses = {
                  pink: "bg-pink-500",
                  yellow: "bg-yellow-400",
                  blue: "bg-blue-500",
                  red: "bg-red-500",
                  green: "bg-green-500",
                  black: "bg-black",
                  purple: "bg-purple-500"
                };
                const isSelected = kitColors.includes(color);
                return (
                  <button
                    key={color}
                    type="button"
                    onClick={() => toggleKitColor(color)}
                    className={`w-10 h-10 rounded-full border-2 transition-shadow ${
                      isSelected ? "ring-2 ring-offset-0 ring-black/80" : "border-gray-300"
                    } ${colorClasses[color]}`}
                  />
                );
              })}
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-3 mt-2">
              <button
                onClick={() => handleKitQuantityChange("remove")}
                className="px-3 py-1 text-white bg-red-600 rounded hover:bg-red-700"
              >
                -
              </button>
              <span className="font-medium">Quantity: {kitQuantity}</span>
              <button
                onClick={() => handleKitQuantityChange("add")}
                className="px-3 py-1 text-white bg-green-600 rounded hover:bg-green-700"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Footer / Total Section */}
        <div className="flex flex-col items-center gap-4 pt-4 border-t border-gray-200 md:flex-row md:justify-between">
          <p className="text-xl font-bold text-gray-900 sm:text-2xl">
            Total: ${total.toFixed(2)}
          </p>
          <button
            onClick={handleOrderNow}
            disabled={total === 0}
            className="px-8 py-3 text-white font-semibold transition bg-blue-700 rounded-xl hover:bg-pink-600 disabled:bg-gray-400"
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopKit;