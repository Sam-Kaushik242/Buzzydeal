import './App.css';
import Header from "./Components/layout/Header/Header.js"
import Footer from "./Components/layout/Footer/Footer.js"
import Home from "./Components/Home/Home.js"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import ProductDetails from './Components/Product/ProductDetails.js';
import Search from "./Components/Filtration/Search.js"
import Products from './Components/Product/Products.js';
import LoginSignUp from './Components/User/LoginSignUp.js';
import Profile from './Components/User/Profile.js';
import UpdateProfile from './Components/User/UpdateProfile.js';
import UpdatePassword from './Components/User/UpdatePassword.js';
import ForgotPassword from './Components/User/ForgotPassword.js';
import ResetPassword from './Components/User/ResetPassword.js';
import Cart from './Components/Cart/Cart.js';
import Shipping from './Components/Cart/Shipping.js';
import ConfirmOrder from './Components/Cart/ConfirmOrder.js';
import Payment from './Components/Cart/Payment.js';
import store from "./store.js"
import { useEffect, useState } from 'react';
import { loadUser } from './actions/userAction.js';
import UserOptions from "./Components/layout/Header/UserOptions.js"
import { useSelector } from 'react-redux';
import axios from 'axios';
function App() {

  const {isAuthenticated, user} = useSelector((state)=> state.user)
  const [stripeApiKey, setStripeApiKey] = useState("")
  
  async function getStripeApiKey() {
    try {
      const { data } = await axios.get("/api/v1/stripeapikey");
      setStripeApiKey(data.stripeApiKey);
      console.log(stripeApiKey);
    } catch (error) {
      // Handle the 404 error or any other errors
      if (error.response && error.response.status === 404) {
        console.error("Stripe API key not found. Check your server configuration.");
      } else {
        console.error("An error occurred while fetching the Stripe API key:", error.message);
      }
    }
  }
  useEffect(()=>{
    store.dispatch(loadUser())
    getStripeApiKey()
  },[])
  return <Router>
    <Header/>
    {isAuthenticated && <UserOptions user={user}/>}
    <Routes>
    <Route exact path='/' element={<Home/>}/>
    <Route exact path='/product/:id' element={<ProductDetails />}/>
    <Route exact path='/products'  element={<Products />}/>
    <Route  path='/products/:keyword'  element={<Products />}/>
    <Route exact path='/Search' element={<Search />}/>
    <Route exact path='/login' element={<LoginSignUp />}/>
    <Route exact path='/account' element={<Profile />}/>
    <Route exact path='/me/update' element={<UpdateProfile />}/>
    <Route exact path='/password/update' element={<UpdatePassword />}/>
    <Route exact path='/password/forgot' element={<ForgotPassword />}/>
    <Route exact path='/password/reset/:token' element={<ResetPassword />}/>
    <Route exact path='/Cart' element={<Cart />}/>
    <Route exact path='/login/shipping' element={<Shipping />}/>
    <Route exact path='/order/confirm' element={<ConfirmOrder />}/>
    <Route exact path='/process/payment' element={<Payment />}/>
    </Routes>
    <Footer/>
  </Router>
      
}

export default App;
