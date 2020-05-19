import React, {useEffect, useState} from 'react'


import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import '../../styles/slider.css'
import Slide from './Slide'

const MySlider = ({settings,products}) => {

  return (
    <div className='slider'>
        <div className= 'slider-wrapper'>
            <Slider {...settings}>

            {products.map((product, index) => (<Slide key={index} product={product}/>))}

            </Slider>
        </div>

    </div>
  )
}

export default MySlider