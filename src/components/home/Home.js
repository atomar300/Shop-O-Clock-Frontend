import React, { useEffect } from 'react'
import { BiSolidChevronsDown } from "react-icons/bi";
import "./Home.css"
import ProductCard from "./ProductCard"
import MetaData from '../layout/MetaData';
import { getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from '../layout/loader/Loader';
//import { toast } from 'react-toastify';
import toast from 'react-hot-toast';


const Home = () => {

    const dispatch = useDispatch();
    const { loading, error, products } = useSelector(state => state.products)

    useEffect(() => {
        
        if (error) {
            return toast.error(error)
        }
        dispatch(getProduct());

    }, [dispatch, error]);


    return (
        <div>

            {loading ? (<Loader />) : (

                <div>

                        <MetaData title={"Shop O'Clock"} />

                        <div className='banner'>
                            <p>Welcome (^_^)</p>
                            <h1>BECAUSE IT'S SHOP O'CLOCK SOMEWHERE</h1>

                            <a href="#home-container">
                                <button>
                                    <BiSolidChevronsDown size={30} />
                                </button>
                            </a>
                        </div>

                        <h2 className="homeHeading">Featured Products</h2>


                        <div className='home-container' id='home-container'>
                            {
                                products && products.map(p => (<ProductCard product={p} />))
                            }
                        </div>


                </div>
            )}
        </div>
    )
}

export default Home

