import { useEffect } from "react";
import Header from "./components/layout/header/Header.js";
import { BrowserRouter as Router, Routes, Route, HashRouter } from "react-router-dom";
import "./App.css"
import Footer from "./components/layout/footer/Footer.js";
import Home from "./components/home/Home.js";
import ProductDetails from "./components/product/ProductDetails.js";
import Products from "./components/product/Products.js";
import LoginSignUp from "./components/User/LoginSignUp.js";
import store from "./store.js"
import { loadUser } from "./actions/userAction.js";
import UserOptions from "./components/layout/header/UserOptions.js";
import { useSelector } from 'react-redux';
import Profile from "./components/User/Profile.js";
import PrivateRoute from "./components/Route/PrivateRoute.js";
import UpdateProfile from "./components/User/UpdateProfile.js";
import UpdatePassword from "./components/User/UpdatePassword.js";
import ForgotPassword from "./components/User/ForgotPassword.js";
import ResetPassword from "./components/User/ResetPassword.js";
import Cart from "./components/Cart/Cart.js";
import Shipping from "./components/Cart/Shipping.js";
import ConfirmOrder from "./components/Cart/ConfirmOrder.js"
import OrderSuccess from "./components/Cart/OrderSuccess.js";
import MyOrders from "./components/Order/MyOrders.js";
import OrderDetails from "./components/Order/OrderDetails.js";
import PrePayment from "./components/Cart/PrePayment.js";


function App() {

  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    store.dispatch(loadUser());
  }, [])

  return (
    <div>
      <HashRouter>
        <Header />
        {isAuthenticated && <UserOptions user={user} />}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route exact path="/products" element={<Products />} />
          <Route exact path="/products/:keyword" element={<Products />} />
          <Route element={<PrivateRoute />}>
            <Route path='/account' element={<Profile />} />
            <Route path='/me/update' element={<UpdateProfile />} />
            <Route exact path="/password/update" element={<UpdatePassword />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route exact path="/order/confirm" element={<ConfirmOrder />} />
            <Route path="/process/payment" element={<PrePayment />} />
            <Route path="/success" element={<OrderSuccess />} />
            <Route path="/orders" element={<MyOrders />} />
            <Route exact path="/order/:id" element={<OrderDetails />} />
          </Route>
          <Route path="/login" element={<LoginSignUp />} />
          <Route exact path="/password/forgot" element={<ForgotPassword />} />
          <Route exact path="/password/reset/:token" element={<ResetPassword />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <Footer />
      </HashRouter>
    </div>
  );
}

export default App;
