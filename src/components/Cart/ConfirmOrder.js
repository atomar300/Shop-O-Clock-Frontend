import React from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import "./ConfirmOrder.css";
import { Link, useNavigate } from "react-router-dom";

const ConfirmOrder = () => {
    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();

    const subtotal = Math.round(((cartItems.reduce((acc, item) => acc + item.quantity * item.price,0)) + Number.EPSILON) * 100) / 100;

    const shippingCharges = subtotal > 99 ? 0 : 15;

    const tax = Math.round(((subtotal * 0.13) + Number.EPSILON) * 100) / 100;

    const totalPrice = Math.round(((subtotal + tax + shippingCharges) + Number.EPSILON) * 100) / 100;

    const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.province}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

    const proceedToPayment = () => {
        const data = {
            subtotal,
            shippingCharges,
            tax,
            totalPrice,
        };

        // session is another local storage but it is stored only for a given tab in browser unlike localstorage, where data is saved for good unless cleaned.
        sessionStorage.setItem("orderInfo", JSON.stringify(data));
        navigate("/process/payment");
    };

    return (
        <div>
            <MetaData title="Confirm Order" />
            <CheckoutSteps activeStep={1} />
            <div className="confirmOrderPage">
                <div>
                    <div className="confirmshippingArea">
                        <h3>Shipping Details</h3>
                        <div className="confirmshippingAreaBox">
                            <div>
                                <p>Name:</p>
                                <span>{user.name}</span>
                            </div>
                            <div>
                                <p>Phone:</p>
                                <span>{shippingInfo.phoneNo}</span>
                            </div>
                            <div>
                                <p>Address:</p>
                                <span>{address}</span>
                            </div>
                        </div>
                    </div>
                    <div className="confirmCartItems">
                        <h3>Cart Items:</h3>
                        <div className="confirmCartItemsContainer">
                            {cartItems &&
                                cartItems.map((item) => (
                                    <div key={item.product}>
                                        <img src={item.image} alt="Product" />
                                        <Link to={`/product/${item.product}`}>
                                            {item.name}
                                        </Link>{" "}
                                        <span>
                                            {item.quantity} x ${item.price} ={" "}
                                            <b>${subtotal}</b>
                                        </span>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
                {/*  */}
                <div>
                    <div className="orderSummary">
                        <h3>Order Summery</h3>
                        <div>
                            <div>
                                <p>Subtotal:</p>
                                <span>${subtotal}</span>
                            </div>
                            <div>
                                <p>Shipping Cost:</p>
                                <span>${shippingCharges}</span>
                            </div>
                            <div>
                                <p>Tax:</p>
                                <span>${tax}</span>
                            </div>
                        </div>

                        <div className="orderSummaryTotal">
                            <p>
                                <b>Total:</b>
                            </p>
                            <span>${totalPrice}</span>
                        </div>

                        <button onClick={proceedToPayment}>Proceed To Payment</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmOrder;