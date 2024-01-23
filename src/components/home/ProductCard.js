import React from 'react'
import {Link} from "react-router-dom";
import "./ProductCard.css";
import { Rating } from '@mui/material';


const ProductCard = ({product}) => {

  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <Link className='product-card' to={`/product/${product.id}`}>
      <div className='box'>
        <div className='content'>

          <div className='image'>
            <img src={product.images[0].url} alt={product.name} />
          </div>
          
          <h3>{product.name}</h3>

          <div className='ratings'>
            <span><Rating {...options}/></span>
            <span>({product.numOfReviews})</span>
          </div>

          <div className='price'>{`$${product.price}`}</div>

        </div>
      </div>
    </Link>
  )
}

export default ProductCard