import { useRef, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { HiSearch } from "react-icons/hi";

function Header() {

    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/products/${keyword}`);

        }
    }

    // reference to the responsive navbar when used on devices less than 600 pixels
    const navRef = useRef();

    const showNavbar = () => {
        navRef.current.classList.toggle(
            "responsive_nav"
        );
        document.body.classList.toggle('lock-scroll');
    };

    return (
        <header>

            <div className="logo">
                <Link to="/">SHOP O'CLOCK</Link>
            </div>

            <div className="search-box">
                <form className="search" onSubmit={handleSubmit} autocomplete="off">

                    <button className="search-button">
                        <HiSearch />
                    </button>

                    <input
                        className="search-input"
                        id="srch"
                        type="text"
                        placeholder="Search..."
                        name="keyword"
                        value={keyword}
                        onChange={e => setKeyword(e.target.value)}
                    />

                    {keyword.length > 0 &&
                        <button className="clear-button" onClick={() => setKeyword("")}>
                            <FaTimes />
                        </button>
                    }

                </form>
            </div>

            <nav ref={navRef}>
                <Link className="textLink" onClick={showNavbar} to="/">Home</Link>
                <Link className="textLink" onClick={showNavbar} to="/products">Products</Link>
                <Link className="textLink" onClick={showNavbar} to="/contact">Contact</Link>
                <Link className="textLink" onClick={showNavbar} to="/about">About</Link>
                <Link onClick={showNavbar} to="/cart"><AiOutlineShoppingCart /></Link>
                <Link onClick={showNavbar} to="/login"><BiUserCircle /></Link>
                <button
                    className="nav-btn nav-close-btn"
                    onClick={showNavbar}>
                    <FaTimes />
                </button>
            </nav>

            <button
                className="nav-btn"
                onClick={showNavbar}>
                <FaBars />
            </button>

        </header>
    );
}

export default Header;

////////////////////////////////////////////////////

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { AiOutlineShoppingCart, AiOutlineSearch } from "react-icons/ai";
// import { BiUserCircle } from "react-icons/bi";
// import "./Header.css";
// import { useNavigate } from 'react-router-dom';

// export const Header = () => {

//     const [keyword, setKeyword] = useState("");
//     const navigate = useNavigate();

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (keyword.trim()) {
//             navigate(`/products/${keyword}`);

//         } else {
//             navigate(`/products`);
//         }
//     }

//     return (
//         <nav className="navbar">

//             <div className="logo">
//                 <Link to="/">SHOP O'CLOCK</Link>
//             </div>

//             <div className="links">
//                 <Link to="/">Home</Link>
//                 <Link to="/products">Products</Link>
//                 <Link to="/contact">Contact</Link>
//                 <Link to="/about">About</Link>
//             </div>


//             <form className="search" onSubmit={handleSubmit} autocomplete="off">
//                 <input
//                     className="search-input"
//                     type="text"
//                     placeholder="Search..."
//                     name="keyword"
//                     value={keyword}
//                     onChange={e => setKeyword(e.target.value)}
//                 />
//                 <button className="search-button">
//                     <AiOutlineSearch />
//                 </button>
//             </form>


//             {/* <div class="searchbar">
//                 <form onSubmit={handleSubmit} autocomplete="off">
//                     <input type="text"
//                         placeholder="Search a Product..."
//                         name="keyword"
//                         value={keyword}
//                         onChange={e => setKeyword(e.target.value)}
//                     />
//                 </form>

//                 <Link to={`/products/${keyword.trim()}`}>
//                     <AiOutlineSearch size={28} />
//                 </Link>
//             </div> */}


//             <div className="icons">
//                 <Link to="/cart">
//                     <AiOutlineShoppingCart size={28} />
//                 </Link>
//                 <Link to="/profile">
//                     <BiUserCircle size={28} />
//                 </Link>
//             </div>

//         </nav>
//     );
// };

////////////////////////////////////////////////////

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { AiOutlineShoppingCart } from "react-icons/ai";
// import {HiSearch} from "react-icons/hi";
// import { BiUserCircle, BiMenu } from "react-icons/bi";
// import "./Header.css";
// import { useNavigate } from 'react-router-dom';
// import {GrFormClose} from "react-icons/gr";

// export const Header = () => {

//     const [keyword, setKeyword] = useState("");
//     const navigate = useNavigate();

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (keyword.trim()) {
//             navigate(`/products/${keyword}`);

//         } else {
//             navigate(`/products`);
//         }
//     }

//     return (
//         <div>

//         <nav>
//             <input type="checkbox" id="check" />
//             <div className="icon">Design Pro</div>
//             <div className="search_box">
//                 <input type="search" 
//                     placeholder="Search here"
//                     value={keyword}
//                     name="keyword"
//                     onChange={e => setKeyword(e.target.value)}
//                     />
//                 <span><HiSearch /></span>

//             </div>

//             <ol>
//                 <li><Link to="/">Home</Link></li>
//                 <li><Link to="/products">Products</Link></li>
//                 <li><Link to="/contact">Contact</Link></li>
//                 <li><Link to="/about">About</Link></li>
//                 <li><Link to="/cart"><AiOutlineShoppingCart /></Link></li>
//                 <li><Link to="/profile"><BiUserCircle /></Link></li>
//             </ol>

//             <label for="check" className="bar">
//                 <BiMenu className="bars"/>
//                 <GrFormClose className="times" />
//             </label>

//         </nav>

//         <section></section>
//         </div>
/////////////////////////////////////////////////////////////////////
// <header>

//     <input type="checkbox" id="chk1" />

//     <div className="logo">
//         <Link to="/">SHOP O'CLOCK</Link>
//     </div>

//     <div className="search-box">
//         <form className="search" onSubmit={handleSubmit} autocomplete="off">
//             <input
//                 className="search-input"
//                 id="srch"
//                 type="text"
//                 placeholder="Search..."
//                 name="keyword"
//                 value={keyword}
//                 onChange={e => setKeyword(e.target.value)}
//             />
//             <button className="search-button">
//                 <HiSearch />
//             </button>
//         </form>
//     </div>

//     <ul>
// <li><Link to="/">Home</Link></li>
// <li><Link to="/products">Products</Link></li>
// <li><Link to="/contact">Contact</Link></li>
// <li><Link to="/about">About</Link></li>
// <li><Link to="/cart"><AiOutlineShoppingCart /></Link></li>
// <li><Link to="/profile"><BiUserCircle /></Link></li>
//     </ul>

//     <div className="menu">
//         <label for="chk1">
//             <BiMenu className="menu-icon"/>
//         </label>
//     </div>

// </header>
//     );
// };


/*/////////////////////////////////////////////////////////////

import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiUserCircle, BiMenu } from "react-icons/bi";
import { HiSearch } from "react-icons/hi";

function Header() {

    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/products/${keyword}`);

        } else {
            navigate(`/products`);
        }
    }

    const navRef = useRef();

    const showNavbar = () => {
        navRef.current.classList.toggle(
            "responsive_nav"
        );
        document.body.classList.toggle('lock-scroll');
    };

    return (
        <header>

            <div className="logo">
                <Link to="/">SHOP O'CLOCK</Link>
            </div>


            <div className="search-box">
                <form className="search" onSubmit={handleSubmit} autocomplete="off">
                    <input
                        className="search-input"
                        id="srch"
                        type="text"
                        placeholder="Search..."
                        name="keyword"
                        value={keyword}
                        onChange={e => setKeyword(e.target.value)}
                    />
                    <button className="search-button">
                        <HiSearch />
                    </button>
                </form>
            </div>


            <ul className="nav1">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/products">Products</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/cart"><AiOutlineShoppingCart /></Link></li>
                <li><Link to="/profile"><BiUserCircle /></Link></li>
            </ul>



            <nav className="nav2" ref={navRef}>

                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/products">Products</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/cart"><AiOutlineShoppingCart /></Link></li>
                    <li><Link to="/profile"><BiUserCircle /></Link></li>
                </ul>

                <button
                    className="nav-btn nav-close-btn"
                    onClick={showNavbar}>
                    <FaTimes />
                </button>
            </nav>
            <button
                className="nav-btn"
                onClick={showNavbar}>
                <FaBars />
            </button>
        </header>
    );
}

export default Header;

*//////////////////////////////////////////////////////////////