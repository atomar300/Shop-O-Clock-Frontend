import React, { useEffect, useState } from 'react'
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css"
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProductDetails, newReview } from '../../actions/productAction';
import { useParams } from 'react-router-dom';
import ReviewCard from "./ReviewCard.js";
import Loader from '../layout/loader/Loader';
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai"
import MetaData from '../layout/MetaData';
import { addItemsToCart } from '../../actions/cartAction.js';
import { Rating, DialogTitle, DialogActions, Dialog, Button, DialogContent } from '@mui/material';
import { NEW_REVIEW_RESET } from '../../constants/productConstants.js';
import toast from 'react-hot-toast';


const ProductDetails = () => {

    const dispatch = useDispatch();
    const { id } = useParams();
    const { loading, error, product } = useSelector(state => state.productDetails)
    const { success, error: reviewError } = useSelector((state) => state.newReview);

    const options = {
        size: "large",
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
    };

    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const increaseQuantity = () => {
        if (product.stock <= quantity)
            return;

        setQuantity(quantity + 1)
    }

    const decreaseQuantity = () => {
        if (quantity <= 1) return;

        setQuantity(quantity - 1);
    }

    const addToCartHandler = () => {
        dispatch(addItemsToCart(id, quantity));
        toast.success("Item added to cart");
    }

    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
    };


    const reviewSubmitHandler = () => {
        const myForm = new FormData();

        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", id);

        dispatch(newReview(myForm));
        setOpen(false);
    };


    useEffect(() => {

        window.scrollTo(0, 0);

        if (error) {
            toast.error(error)
            dispatch(clearErrors())
        }

        if (reviewError) {
            toast.error(reviewError)
            dispatch(clearErrors());
        }

        if (success) {
            toast.success("Review Submitted Successfully")
            dispatch({ type: NEW_REVIEW_RESET });
        }

        dispatch(getProductDetails(id))
    }, [dispatch, id, error, reviewError, success])

    return (
        <div>
            {loading ? <Loader /> : (
                <div>
                    <MetaData title={`${product.name} -- Shop O'Clock`} />
                    <div className='ProductDetails'>
                        <div>
                            <Carousel className='carousel'>
                                {
                                    product.images && product.images.map((item, index) => (
                                        <div className='image-container'>
                                            <img
                                                className='CarouselImage'
                                                key={item.url}
                                                src={item.url}
                                                alt={`${index} Slide`}
                                            />
                                        </div>
                                    ))
                                }
                            </Carousel>
                        </div>

                        <div>
                            <div className="detailsBlock-1">
                                <h2>{product.name}</h2>
                            </div>

                            <div className="detailsBlock-2">
                                <Rating {...options} />
                                <span>({product.numOfReviews} Reviews)</span>
                            </div>

                            <div className="detailsBlock-3">
                                <h1>{`$${product.price}`}</h1>
                                <div className='detailsBlock-3-1'>
                                    <div className='detailsBlock-3-1-1'>
                                        <button onClick={decreaseQuantity}><AiOutlineMinus /></button>
                                        <input readOnly value={quantity} type="number" />
                                        <button onClick={increaseQuantity}><AiOutlinePlus /></button>
                                    </div>
                                    <button disabled={product.stock < 1 ? true : false} onClick={addToCartHandler}>Add to Cart</button>
                                </div>

                                <p>
                                    {" Status: "}
                                    <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                                        {product.stock < 1 ? "Out Of Stock" : "In Stock"}
                                    </b>
                                </p>
                            </div>

                            <div className='detailsBlock-4'>
                                Description:
                                <p>{product.description}</p>
                            </div>

                            <button onClick={submitReviewToggle} className='submitReview'>Submit Review</button>

                        </div>
                    </div>

                    <section className='testimonials'>

                        <h3 className='testimonials-heading'>REVIEWS</h3>

                        <Dialog
                            open={open}
                            onClose={submitReviewToggle}
                            aria-describedby="simple-dialog-title"
                        >
                            <DialogTitle style={{ fontFamily: "Poiret One" }}>{"Submit Review"}</DialogTitle>
                            <DialogContent className="submitDialog">
                                <Rating
                                    onChange={(e) => setRating(e.target.value)}
                                    value={rating}
                                    size="large"
                                />
                                <textarea
                                    className="submitDialogTextArea"
                                    cols="40"
                                    rows="4"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                ></textarea>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={submitReviewToggle} style={{ color: "white", background: "black", border: "none", fontFamily: "Poiret One" }} variant="outlined" size="small">
                                    Cancel
                                </Button>
                                <Button onClick={reviewSubmitHandler} style={{ color: "white", background: "black", border: "none", fontFamily: "Poiret One" }} variant="outlined" size="small">
                                    Post
                                </Button>
                            </DialogActions>
                        </Dialog>

                        <div className='testimonial-box-container'>
                            {product.reviews && product.reviews[0]
                                ?
                                (product.reviews.map(review => <ReviewCard review={review} />))
                                :
                                (<p className='noReviews'>No Reviews Yet</p>)
                            }
                        </div>
                    </section>
                </div>
            )}
        </div>
    )
}

export default ProductDetails