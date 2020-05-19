import React, {Link, Component} from "react";

import Image from './Image'

import '../../styles/slider.css'

const Slide = ({product, className}) => {

  return (

    <div className="slider-item">
      <div className="product-card">
        <div className="produсt-info">
          <div className="product-title">
            {product.name}
          </div>
          <div className="product-description">
            {product.description}
          </div>
          <div className="product-link"></div>
        </div>
        <Image className='product-img' item={product} url='products'/>
      </div>
    </div>

  );

}

export default Slide