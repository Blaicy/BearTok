import "./App.css";
import {Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import HomePage from "./components/HomePage";
import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";
import BookParty from "./Pages/BookParty";
import Checkout from "./Pages/Checkout";
import ShopKit from "./Pages/ShopKit";
import LogIn from "./Pages/LogIn";
import SignUp from "./Pages/SignUp";
import Orders from "./Pages/Orders";
import Profile from "./Pages/Profile";
const stripePromise = loadStripe(
  "pk_test_51SdShMCZ0ZBV6IDzOLXMkDTrTFxsXGDc58zeLjyH4AQFoo5yBvEhmEY7LUJhe4nYO1zJo8pEQRacptcV1oA6RHIz00Ullznywn"
);

function App() {
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(window.location.search);
  const googleToken = queryParams.get("token");

  if (googleToken) {
    localStorage.setItem("token", googleToken);

    const redirectTo = queryParams.get("from") || "/orders";

    // React-router-safe redirect
    navigate(redirectTo, { replace: true });
  }

  return (
    <Layout>
      {/* Elements is typically used around the routes that contain checkout forms */}
      <Elements stripe={stripePromise}>
        <Routes>
          {/* Public pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/logIn" element={<LogIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/shopKit" element={<ShopKit />} />
          <Route path="/bookParty" element={<BookParty />} />
          <Route path="/orders" element={<Orders />} />

          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile /> 
              </PrivateRoute>
            }
          />
          <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <Elements stripe={stripePromise}>
                <Checkout />
              </Elements>
            </PrivateRoute>
          }
        />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Elements>
    </Layout>
  );
}

export default App;