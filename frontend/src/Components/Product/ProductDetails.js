import React, { Fragment, useEffect, useState } from 'react'
import Carousel from "react-material-ui-carousel"
import { useSelector, useDispatch } from 'react-redux'
import ReactStars from "react-rating-stars-component"
import { clearErrors, getProductDetails } from '../../actions/productActions'
import { useParams } from 'react-router-dom'
import "./productDetails.css"
import ReviewCard from "./ReviewCard.js"
import { useAlert } from 'react-alert'
import  { addItemsToCart } from "../../actions/cartAction.js"
const ProductDetails = () => {
  
  const dispatch = useDispatch()
  const alert = useAlert()
  const { id } = useParams();
  const {product, error} = useSelector(state => state.productDetails)
  console.log(product);
  
  const [quantity, setQuantity] = useState(1);
  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity))
    alert.success("Item Added to Cart")
  }

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "orange",
    value:  product.rating,
    isHalf:true,
    size: window.innerWidth > 600 ? 15 : 10
  }

  useEffect(()=>{
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }
    dispatch(getProductDetails(id));
  },[alert, dispatch, error, id])

  return (
    <Fragment>
      <div className="ProductDetails">
        <div>
          <Carousel>
            {product.images && product.images.map((item, i)=>(
                <img src={item.url} key={item.url} alt={`${i} Slide`} />
            ))}
          </Carousel>
        </div>

        <div>
        <div className="detailsBlock-1">
          <h2>{product.name}</h2>
        </div>
        <div className="detailsBlock-2">
          <ReactStars {...options}/>
          <span>({product.numOfReviews} reviews)</span>
        </div>
        <div className="detailsBlock-3">
          <h1>{`₹${product.price}`}</h1>
          <div className="detailsBlock-3-1">
            <div className="detailsBlock-3-1-1">
            <button onClick={decreaseQuantity}>-</button>
            <input readOnly type="number" value={quantity} />
            <button onClick={increaseQuantity}>+</button>
          </div>{" "}
          <button onClick={addToCartHandler}>Add to Cart</button>
          </div>
          <p>
            Status: {" "}
            <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
              {product.Stock < 1 ? "OutOfStock" : "InStock"}
            </b>
          </p>
          </div>

          <div className="detailsBlock-4">
            Description: <p>{product.description}</p>
          </div>
          <button className='submitReview'>Submit Review</button>
        </div>
      </div>
      <h3 className='reviewsHeading'>REVIEWS</h3>
      {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
    </Fragment>
  )
}

export default ProductDetails
