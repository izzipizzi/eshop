import React, { lazy } from 'react'
import { Link } from 'react-router-dom'
import LazyLoad from '../../LazyLoad'

import Image from './Image'


// const Image = lazy(()=>import('./Image.js'))
// const LazyImage = (props) => <LazyLoad component={Image} {...props} />

const ProductCard = ({product,className}) => {

  return (
    <div className='col-3 mb-5'>
      <div className='card'>
        <div className='card-header'>
          {product.name}
        </div>
        <div className='card-body'>
            {/* <LazyImage item ={product} url ='products'/> */}
            <Image item={product} url ='products'/>

          <p> {product.description}</p>
          <p>Ціна {product.price}</p>
          <Link to ='/'>
              <button className='btn btn-primary mt-2 mb2'>
                  View product
              </button>
          </Link>

          <button className='btn btn-seconadry mt-2 mb2'>
                  Добавити в корзину
              </button>
        </div>

      </div>


    </div>
  )

}
export default ProductCard