import React, { useEffect } from "react";
import "./OrderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link, useParams } from "react-router-dom";
import { getOrderDetails, clearErrors } from "../../actions/orderAction";
import Loader from "../layout/loader/Loader";
//import { toast } from "react-toastify";
import toast from 'react-hot-toast';

const OrderDetails = () => {
    const { order, error, loading } = useSelector((state) => state.orderDetails);

    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch(clearErrors());
        }

        dispatch(getOrderDetails(id));
    }, [dispatch, error, id]);
    return (
        <div>
            {loading ? (
                <Loader />
            ) : (
                <div>
                    <MetaData title="Order Details" />
                    <div className="orderDetailsPage">
                        <div className="orderDetailsContainer">

                            <h2>Order #{order && order.id}</h2>

                            <p>Shipping Info</p>
                            <div className="orderDetailsContainerBox">
                                <div>
                                    <p>Name:</p>
                                    <span>{order.user && order.user.name}</span>
                                </div>
                                <div>
                                    <p>Phone:</p>
                                    <span>
                                        {order.shippingInfo && order.shippingInfo.phoneNo}
                                    </span>
                                </div>
                                <div>
                                    <p>Address:</p>
                                    <span>
                                        {order.shippingInfo &&
                                            `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.province}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                                    </span>
                                </div>
                            </div>
                            <p>Payment</p>
                            <div className="orderDetailsContainerBox">
                                <div>
                                    <p>
                                        {order.paymentInfo &&
                                            order.paymentInfo.status === "succeeded"
                                            ? "PAID"
                                            : "NOT PAID"}
                                    </p>
                                </div>

                                <div>
                                    <p>Amount:</p>
                                    <span>{order.totalPrice && order.totalPrice}</span>
                                </div>
                            </div>

                            <p>Order Status</p>
                            <div className="orderDetailsContainerBox">
                                <div>
                                    <p>
                                        {order.orderStatus && order.orderStatus}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="orderDetailsCartItems">
                            <p>Order Items:</p>
                            <div className="orderDetailsCartItemsContainer">
                                {order.orderItems &&
                                    order.orderItems.map((item) => (
                                        <div key={item.product}>
                                            <img src={item.image} alt="Product" />
                                            <Link to={`/product/${item.product}`}>
                                                {item.name}
                                            </Link>{" "}
                                            <span>
                                                {item.quantity} x ${item.price} ={" "}
                                                ${Math.round(((item.price * item.quantity) + Number.EPSILON) * 100) / 100}
                                            </span>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderDetails;