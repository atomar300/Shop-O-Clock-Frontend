import React, { useEffect, useState } from 'react'
import "./Products.css"
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from '../layout/loader/Loader';
import ProductCard from "../home/ProductCard";
import { useParams } from 'react-router-dom';
import { Pagination } from '@mui/material';
import { FaTimes } from "react-icons/fa";
import Slider from '@mui/material/Slider';
import MetaData from '../layout/MetaData';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
//import { toast } from 'react-toastify';
import toast from 'react-hot-toast';


const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones"
]

const Products = () => {

  const [price, setPrice] = useState([0, 2500]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);
  const [isOpen, setIsopen] = useState(false);

  const ToggleSidebar = () => {
    isOpen === true ? setIsopen(false) : setIsopen(true);
  }

  const { keyword } = useParams();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const { loading, products, error, resultPerPage, filteredProductsCount } = useSelector(state => state.products);

  const setCurrentPageNo = (event, value) => {
    setCurrentPage(value);
  }

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  const applyFilter = () => {
    dispatch(getProduct(keyword, currentPage, price, category, ratings))
    ToggleSidebar();
  }


  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearErrors())
    }
    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, error, currentPage])

  return (
    <div>
      {loading ?
        <Loader /> :
        <div>

            <MetaData title={"Products -- Shop O'Clock"} />

            <h2 className="productsHeading">Products (❤ᴗ❤)</h2>

            <div className='text-center m-5' >
              <Button variant="contained" style={{ color: "white", background: "black", border: "none", borderRadius: "20px", fontFamily: "Poiret One", fontSize: "1.3vmax" }} endIcon={<FilterAltIcon />} onClick={ToggleSidebar}>
                Filters
              </Button>
            </div>

            <div className={`sidebar ${isOpen === true ? 'active' : ''}`}>
              <div className="sd-header">
                <button className="btn btn-dark rounded-pill" onClick={applyFilter}>Apply</button>
                <button className="btn" onClick={ToggleSidebar}><FaTimes /></button>
              </div>

              <div className="filterBox">
                <fieldset className="border p-3">
                  <legend className='float-none w-auto'>Price</legend>
                  <Slider
                    value={price}
                    onChange={priceHandler}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    min={0}
                    max={2500}
                    step={30}
                    marks
                    sx={{
                      color: 'gray',
                      '& .MuiSlider-thumb': {
                        borderRadius: '5px',
                      },
                    }}
                  />

                </fieldset>

                <fieldset className="border p-1">
                  <legend className='float-none w-auto'>Categories</legend>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                  >
                    {categories.map(c => (
                      <FormControlLabel key={c} value={c} control={<Radio size='small' color="default" />} label={<span className='radioLabel'>{c}</span>} />))}
                  </RadioGroup>
                </fieldset>


                <fieldset className="border p-3">
                  <legend className='float-none w-auto'>Ratings</legend>
                  <Slider
                    value={ratings}
                    onChange={(e, newRating) => {
                      setRatings(newRating);
                    }}
                    aria-labelledby='continuos-slider'
                    min={0}
                    max={5}
                    valueLabelDisplay='auto'
                    sx={{
                      color: 'gray',
                      '& .MuiSlider-thumb': {
                        borderRadius: '5px',
                      },
                    }}
                  />
                </fieldset>

              </div>
            </div>
            <div className={`sidebar-overlay ${isOpen === true ? 'active' : ''}`} onClick={ToggleSidebar}></div>

            <div className="products">
              {products.length > 0 ?
                (products.map((p) => (<ProductCard key={p.id} product={p} />)))
                :
                (
                  <div className='no-products-found'>
                    <h1>{"(≥o≤)"}</h1>
                    <h2>Can't Find Any Products</h2>
                  </div>
                )
              }
            </div>

            <div>
              {resultPerPage < filteredProductsCount && (
                <Pagination
                  className='pagination'
                  count={Math.ceil(filteredProductsCount / resultPerPage)}
                  page={currentPage}
                  siblingCount={1}
                  boundaryCount={1}
                  variant="outlined"
                  shape="rounded"
                  size='large'
                  onChange={setCurrentPageNo}
                />
              )}
            </div>

        </div>
      }
    </div>
  )
}

export default Products




// import React, { useEffect, useState } from 'react'
// import "./Products.css"
// import { useSelector, useDispatch } from "react-redux";
// import { clearErrors, getProduct } from "../../actions/productAction";
// import Loader from '../layout/loader/Loader';
// import ProductCard from "../home/ProductCard";
// import { useParams } from 'react-router-dom';
// import Fade from 'react-reveal/Fade';
// import { Pagination } from '@mui/material';
// import { FaTimes } from "react-icons/fa";
// import Slider from '@mui/material/Slider';
// import { useAlert } from "react-alert";
// import MetaData from '../layout/MetaData';

// const categories = [
//   "Laptop",
//   "Footwear",
//   "Bottom",
//   "Tops",
//   "Attire",
//   "Camera",
//   "SmartPhones"
// ]

// const Products = () => {

//   const [price, setPrice] = useState([0, 2500]);
//   const [category, setCategory] = useState("");
//   const [ratings, setRatings] = useState(0);
//   const [isOpen, setIsopen] = useState(false);
//   const alert = useAlert();

//   const ToggleSidebar = () => {
//     isOpen === true ? setIsopen(false) : setIsopen(true);
//   }

//   const { keyword } = useParams();
//   const dispatch = useDispatch();
//   const [currentPage, setCurrentPage] = useState(1);
//   const { loading, products, error, productsCount, resultPerPage, filteredProductsCount } = useSelector(state => state.products);

//   const setCurrentPageNo = (event, value) => {
//     setCurrentPage(value);
//   }

//   const priceHandler = (event, newPrice) => {
//     setPrice(newPrice);
//   };

//   useEffect(() => {
//     if (error) {
//       alert.error(error)
//       dispatch(clearErrors())
//     }
//     dispatch(getProduct(keyword, currentPage, price, category, ratings));
//   }, [dispatch, keyword, error, currentPage, category, ratings, alert, error])

//   return (
//     <div>
//       {loading ?
//         <Loader /> :
//         <div>
//           <Fade>

//             <MetaData title={"Products -- Shop O'Clock"} />

//             <h2 className="productsHeading">Products (❤ᴗ❤)</h2>

//             <div className='text-center' >
//               <button className="btn btn-dark rounded-pill w-25 m-3" onClick={ToggleSidebar} >
//                 Filters
//               </button>
//             </div>

//             <div className={`sidebar ${isOpen === true ? 'active' : ''}`}>
//               <div className="sd-header">
//                 <h4 className="mb-0">Apply Filters</h4>
//                 <button className="btn" onClick={ToggleSidebar}><FaTimes /></button>
//               </div>

//               <div className="filterBox">
//                 <fieldset className="border p-3">
//                   <legend className='float-none w-auto'>Price</legend>
//                   <Slider
//                     value={price}
//                     onChange={priceHandler}
//                     valueLabelDisplay="auto"
//                     aria-labelledby="range-slider"
//                     min={0}
//                     max={2500}
//                     step={30}
//                     marks
//                     sx={{
//                       color: 'gray',
//                       '& .MuiSlider-thumb': {
//                         borderRadius: '5px',
//                       },
//                     }}
//                   />

//                   <div className='price-button'>
//                     <button
//                       type="button"
//                       className="btn btn-dark"
//                       onClick={() => dispatch(getProduct(keyword, currentPage, price, category, ratings))}>
//                       Go
//                     </button>
//                   </div>

//                 </fieldset>

//                 <fieldset className="border p-3">
//                   <legend className='float-none w-auto'>Categories</legend>
//                   <ul className='categoryBox'>
//                     {categories.map(category => (
//                       <li
//                         className='category-link'
//                         key={category}
//                         onClick={() => setCategory(category)}
//                       >
//                         {category}
//                       </li>
//                     ))}
//                   </ul>
//                 </fieldset>


//                 <fieldset className="border p-3">
//                   <legend className='float-none w-auto'>Ratings</legend>
//                   <Slider
//                     value={ratings}
//                     onChange={(e, newRating) => {
//                       setRatings(newRating);
//                     }}
//                     aria-labelledby='continuos-slider'
//                     min={0}
//                     max={5}
//                     valueLabelDisplay='auto'
//                     sx={{
//                       color: 'gray',
//                       '& .MuiSlider-thumb': {
//                         borderRadius: '5px',
//                       },
//                     }}
//                   />
//                 </fieldset>

//               </div>
//             </div>
//             <div className={`sidebar-overlay ${isOpen === true ? 'active' : ''}`} onClick={ToggleSidebar}></div>

//             <div className="products">
//               {products.length > 0 ?
//                 (products.map((p) => (<ProductCard key={p.id} product={p} />)))
//                 :
//                 (
//                   <div className='no-products-found'>
//                     <h1>{"(≥o≤)"}</h1>
//                     <h2>Can't Find Any Products</h2>
//                   </div>
//                 )
//               }
//             </div>

//             <div>
//               {resultPerPage < filteredProductsCount && (
//                 <Pagination
//                   className='pagination'
//                   count={Math.ceil(filteredProductsCount / resultPerPage)}
//                   page={currentPage}
//                   siblingCount={1}
//                   boundaryCount={1}
//                   variant="outlined"
//                   shape="rounded"
//                   size='large'
//                   onChange={setCurrentPageNo}
//                 />
//               )}
//             </div>

//           </Fade>
//         </div>
//       }
//     </div>
//   )
// }

// export default Products
