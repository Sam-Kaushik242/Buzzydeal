import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css/navigation';
import data from "./slider.json"
import { MdArrowOutward } from "react-icons/md";
import { Link } from 'react-router-dom';
const Add = ({product}) => {

  return (
    <>
      <Swiper
      spaceBetween={0}
      centeredSlides={false}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper">
        {data && data?.map((fronts) => (
          <SwiperSlide>
            <div key={fronts.id} className='add'>
            <img src={fronts.img} alt="No Img" className='addImg' />
              <span className='addData'>
                <span>{fronts.name}</span>
                <span>{fronts.desc}</span>
                <div className="bttn">
                <button className='btn'><a href="#products">Scroll</a></button>
                <Link to={`/products/${fronts.id}`}>
                <h3 >Explore <MdArrowOutward style={{fontSize: "20px"}}/></h3>
                </Link>
                </div>
              </span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
        </>
  )
}

export default Add
