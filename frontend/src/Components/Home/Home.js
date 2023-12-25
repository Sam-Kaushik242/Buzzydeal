import React, { Fragment, useEffect } from 'react'
import { CiDesktopMouse2 } from "react-icons/ci";
import "./Home.css"
import MetaData from '../layout/MetaData';
import {useSelector, useDispatch} from "react-redux"
import {clearErrors, getProduct} from "../../actions/productActions"
import ProductCard from './ProductCard';
import Loader from '../layout/Loader/Loader';
import {useAlert} from "react-alert"


const Home = () => {

    const alert = useAlert()
    const dispatch = useDispatch()
    const {loading, error, products} = useSelector((state) => state.products)
  
    useEffect(()=>{
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        dispatch(getProduct())
    },[dispatch, error, alert])
  return (
    <Fragment>
        {loading ?  <Loader/> :  <Fragment>

<MetaData title="BUZZYDEAL"/>

<div className="banner">
    <h1>Welcome to BuzzyDeal</h1>
    <h3>FIND AMAZING PRODUCTS BELOW</h3>

    <a href="#container">
        <button>
            Scroll <CiDesktopMouse2/>
        </button>
    </a>
</div>

<h3 className='homeHeading'>Featured Products</h3>
<div className="container" id="container">
{products && products.map((product, index)=>(
    <ProductCard key={index} product={product}/>
  ))}
</div>
</Fragment>
}
    </Fragment>
  )
}

export default Home
