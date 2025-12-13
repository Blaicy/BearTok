import './App.css';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import HomePage from './components/HomePage';
import Layout from './components/Layout';
import BookParty from './Pages/BookParty';
import Checkout from './Pages/Checkout';
import ShopKit from './Pages/ShopKit';
import LogIn from './Pages/LogIn';
import SignUp from './Pages/SignUp';
import Orders from './Pages/Orders';
import PrivateRoute from './components/PrivateRoute';
import Profile from './Pages/Profile';
const stripePromise = loadStripe("pk_test_51SdShMCZ0ZBV6IDzOLXMkDTrTFxsXGDc58zeLjyH4AQFoo5yBvEhmEY7LUJhe4nYO1zJo8pEQRacptcV1oA6RHIz00Ullznywn");

function App() {
  const queryParams = new URLSearchParams(window.location.search);
  const googleToken = queryParams.get("token");

  if (googleToken) {
    localStorage.setItem("token", googleToken);

    // Use URL param "from" to redirect to the intended page if available
    const redirectTo = queryParams.get("from") || "/orders";
    window.location.href = redirectTo;
  }

  return (
    <Layout>
      <Routes>
        {/* Public pages */}
        <Route path="/" element={<HomePage />} />
        <Route path="/logIn" element={<LogIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />

        {/* Protected pages */}
        
        <Route path="/shopKit" element={
          <PrivateRoute>
            <ShopKit />
          </PrivateRoute>
        }/>
        <Route path="/checkout" element={
          <PrivateRoute>
            <Elements stripe={stripePromise}>
              <Checkout />
            </Elements>
          </PrivateRoute>
        }/>
        <Route path="/bookParty" element={
          <PrivateRoute>
            <BookParty />
          </PrivateRoute>
        }/>
        <Route path="/orders" element={
          <PrivateRoute>
            <Orders />
          </PrivateRoute>
        }/>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  );
}

export default App;
