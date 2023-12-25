import React, { Fragment, useEffect, useState } from 'react'
import Loader from '../layout/Loader/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, getProduct } from '../../actions/productActions'
import Product from "../Home/ProductCard.js"
import { useParams } from 'react-router-dom'
import  Pagination  from 'react-js-pagination'
import "./Products.css"
import Slider from "@material-ui/core/Slider";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import MetaData from '../layout/MetaData.js'

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];

const Products = ({match}) => {
  const dispatch = useDispatch()
  const { keyword } = useParams()
  const alert = useAlert();
  
  const [currentPage, setCurrentPage] = useState(1)
  const [ratings, setRatings] = useState(0);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  
  const {products, loading, error, productsCount, resultPerPage} = useSelector((state)=> state.products)
  const setCurrentPageNo = (e) => {
    setCurrentPage(e)
  }

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  useEffect(()=>{
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, price, category, ratings))
  },[dispatch, keyword, currentPage, price, category, ratings, error, alert])

  return (
    <Fragment>
      {loading? <Loader/>: <Fragment>
        <MetaData title="Products"/>
        <h2 className="productsHeading">Products</h2>
        <div className="products">
        {products && products.map((product)=>(
          <Product key={product._id} product={product}/>
          ))}
          </div>

          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
            />

            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

            <fieldset>
              <Typography component="legend" className='legend'>Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
          </div>

          {resultPerPage < productsCount && (
            <div className="paginationBox">
            <Pagination
            activePage={currentPage}
            itemsCountPerPage={resultPerPage}
            totaltemsCount={productsCount}
            onChange={setCurrentPageNo}
            nextPageText="Next"
            prevPageText="Prev"
            firstPageText="1st"
            lastPageText="last"
            itemClass="page-item"
            linkClass="page-link"
            activeClass="pageItemActive"
            activeLinkClass="pageLinkActive"
            />
          </div>
          )}
        </Fragment>
        }
    </Fragment>
  )
}

export default Products
