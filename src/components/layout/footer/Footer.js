import React from "react";
import {BsInstagram} from "react-icons/bs";
import {BsFacebook} from "react-icons/bs"
import "./Footer.css";


const Footer = () => {
  return (
    <footer id="footer">
      {/* <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="Appstore" />
      </div> */}

      <div className="midFooter">
        <h3>SHOP O'CLOCK</h3>
        <p>BECAUSE IT'S SHOP O'CLOCK SOMEWHERE</p>

        <p>Copyrights 2023 &copy; Ashish Tomar</p>
      </div>

      <div className="rightFooter">
        <h4>FOLLOW US</h4>
        <a href="https://www.instagram.com/_ashish.tomar_/?utm_source=qr">
          <BsInstagram/>
        </a>
        <a href="https://www.instagram.com/_ashish.tomar_/?utm_source=qr">
          <BsFacebook />
        </a>
      </div>
    </footer>
  );
};

export default Footer;