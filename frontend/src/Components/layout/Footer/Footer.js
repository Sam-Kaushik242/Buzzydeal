import React from 'react'
import playstore from "../../../playstore.png"
import appstore from "../../../Appstore.png"
import { TiSocialInstagram } from "react-icons/ti";
import { FaTwitter, FaYoutube  } from "react-icons/fa";
import "./Footer.css"
const Footer = () => {
  return (
    <footer id='footer'>
      <div className="leftFooter">
        <span>DOWNLOAD OUR APP</span>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playstore} alt=""  />
        <img src={appstore} alt=""  />
      </div>

      <div className="midFooter">
        <h1>BuzzyDeal</h1>
      <h2>About Us</h2>
            <span>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta, maiores eligendi! Nihil nam adipisci aperiam eos harum hic, sunt doloribus aut quam tempore odit et, debitis quia. Ad iste reiciendis itaque velit illum, cupiditate sapiente?
            </span>
            <div className="contact">
                <p><i className="fa fa-phone"></i> +12 9963658252</p>
                <p><i className="fa fa-envelope"></i> buzzydealinfo@example.com</p>
                <p>&copy; 2023 BuzzyDeal. All rights reserved.</p>
                </div>
      </div>

      <div className="rightFooter">
        <h3>Follow US</h3>
        <span className='handleAcc'>
        <a href="https://www.instagram.com/abc/"><TiSocialInstagram style={{color: "white"}}/></a>
        <a href="https://www.twitter.com/abc/"><FaTwitter style={{color: "white"}}/></a>
        <a href="https://www.youtube.com/nop/"><FaYoutube style={{color: "white"}}/></a>
        </span>
      </div>
    </footer>
  )
}

export default Footer;
