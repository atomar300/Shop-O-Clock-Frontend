import React from "react";
import "./CartItemCard.css";
import { Link } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from "@mui/material";

const CartItemCard = ({ item, deleteCartItems }) => {
  return (
    <div className="CartItemCard">
      <IconButton className="removeItem">
        <DeleteIcon onClick={() => deleteCartItems(item.product)}/>
      </IconButton>
      <img src={item.image} alt="ssa" />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price: $${item.price}`}</span>
      </div>
    </div>
  );
};

export default CartItemCard;