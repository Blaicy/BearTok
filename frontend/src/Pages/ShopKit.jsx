import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useMemo } from "react";

const ShopKit = () => {
  const navigate = useNavigate();
  const base = import.meta.env.BASE_URL;

  // BearKit state
  const [kitQuantity, setKitQuantity] = useState(1);
  const [selectedKitSize, setSelectedKitSize] = useState(null);
  const [kitColors, setKitColors] = useState([]);
  const kitPriceMap = { "23": 45, "33": 65, "53": 85 };
  const kitPrice = selectedKitSize ? kitPriceMap[selectedKitSize] : 0;

  // T-Shirt state
  const shirtSizes = ["S", "M", "L", "XL"];
  const shirtPrice = 10;
  const [shirtOrders, setShirtOrders] = useState(
    shirtSizes.reduce((acc, size) => ({ ...acc, [size]: { quantity: 0 } }), {})
  );

  // 🚨 FIX: Cleaned up the dependency array. 
  // kitPrice already depends on selectedKitSize, so we only need to track kitPrice.


const total = useMemo(() => {
  const kitTotal = kitPrice * kitQuantity;
  const shirtTotal = Object.values(shirtOrders).reduce(
    (sum, order) => sum + order.quantity * shirtPrice,
    0
  );
  return kitTotal + shirtTotal;
}, [kitPrice, kitQuantity, shirtOrders]);

  // Handlers
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

  const handleShirtQuantityChange = (size, value) => {
    setShirtOrders((prev) => ({
      ...prev,
      [size]: { ...prev[size], quantity: Math.max(0, value) },
    }));
  };

  const handleOrderNow = () => {
    // 1. Validation check
    if (!selectedKitSize && Object.values(shirtOrders).every((o) => o.quantity === 0)) {
      return toast.error("Select at least one product!");
    }

    // 2. Prepare Order Data structure (used by the Checkout component)
    // The Checkout component (previously fixed) expects this structure for a cart-like order:
    const orderData = { 
        products: [], 
        total,
        // Since price is used by the Checkout.jsx for Stripe intent, we map total to price
        price: total 
    }; 

    // Add Bear Kit if selected
    if (selectedKitSize) {
      orderData.products.push({
        itemName: "BearTok Creativity Kit",
        size: selectedKitSize,
        quantity: kitQuantity,
        colors: kitColors.length ? kitColors : ["Any"],
        price: kitPrice * kitQuantity, // Price for this line item
      });
    }

    // Add T-Shirts if selected
    Object.entries(shirtOrders).forEach(([size, order]) => {
      if (order.quantity > 0) {
        orderData.products.push({
          itemName: "BearTok T-Shirt",
          size,
          quantity: order.quantity,
          price: order.quantity * shirtPrice, // Price for this line item
        });
      }
    });

    // 3. Navigate to checkout, passing the complete order data
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

      <h1 className="z-10 mb-6 text-3xl font-bold text-white sm:text-4xl">
        Shop Kits & Shirts
      </h1>

      <div className="relative z-10 w-full max-w-4xl p-6 space-y-8 border shadow-lg bg-white/80 backdrop-blur-xl rounded-3xl">

        {/* BearKit Section */}
        <div className="flex flex-col items-center gap-6 md:flex-row">
          <img
            src={`${base}images/Item1.jpg`}
            alt="BearKit"
            className="object-cover w-full h-56 border border-gray-300 shadow-md md:w-80 rounded-2xl"
          />
          <div className="flex flex-col flex-1 gap-4 text-gray-800">
            <h2 className="text-2xl font-semibold text-pink-600">BearTok Creativity Kit</h2>
            <p className="text-sm sm:text-base">Includes: Fluid Bear, 4 bottles of 8oz paint, and Gloves</p>

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

            {/* Select Paint Colors */}
            <span className="block mt-2 text-sm font-semibold">Select Paint Colors:</span>
            <div className="flex flex-wrap gap-2 mt-1">
              {["pink", "yellow", "blue", "red"].map((color) => {
                const colorClasses = {
                  pink: "bg-pink-500",
                  yellow: "bg-yellow-400",
                  blue: "bg-blue-500",
                  red: "bg-red-500",
                };
                const isSelected = kitColors.includes(color);
                return (
                  <button
                    key={color}
                    onClick={() => toggleKitColor(color)}
                    className={`w-10 h-10 rounded-full border-2 transition-shadow ${
                      isSelected ? "ring-2 ring-offset-0 ring-black/80" : "border-gray-300"
                    } ${colorClasses[color]}`}
                  />
                );
              })}
            </div>

            {/* Kit Quantity */}
            <div className="flex items-center gap-3 mt-2">
              <button
                onClick={() => handleKitQuantityChange("remove")}
                className="px-3 py-1 text-white bg-red-600 rounded hover:bg-red-700"
              >
                -
              </button>
              <span>Quantity: {kitQuantity}</span>
              <button
                onClick={() => handleKitQuantityChange("add")}
                className="px-3 py-1 text-white bg-green-600 rounded hover:bg-green-700"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* T-Shirt Section */}
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-semibold text-blue-600">BearTok T-Shirts</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {shirtSizes.map((size) => (
              <div
                key={size}
                className="flex flex-col items-center gap-3 p-4 transition bg-white border shadow-md rounded-2xl hover:shadow-lg"
              >
                <h3 className="text-lg font-semibold text-gray-800">Size {size}</h3>
                <p className="text-sm text-gray-500">Price: ${shirtPrice}</p>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() => handleShirtQuantityChange(size, shirtOrders[size].quantity - 1)}
                    className="px-3 py-1 text-white transition bg-red-600 rounded hover:bg-red-700"
                  >
                    -
                  </button>
                  <span className="font-medium text-gray-800">{shirtOrders[size].quantity}</span>
                  <button
                    onClick={() => handleShirtQuantityChange(size, shirtOrders[size].quantity + 1)}
                    className="px-3 py-1 text-white transition bg-green-600 rounded hover:bg-green-700"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* Total & Order */}
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <p className="text-xl font-bold text-gray-900 sm:text-2xl">Total: ${total.toFixed(2)}</p>
          <button
            onClick={handleOrderNow}
            // Disable button if total is 0
            disabled={total === 0} 
            className="px-6 py-3 text-white transition bg-blue-700 rounded-xl hover:bg-green-700 disabled:bg-gray-400"
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopKit;