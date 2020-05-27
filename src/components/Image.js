import React from 'react'
import {API} from '../config'


const Image = ({product}) =>{
    const style ={
        media: {
            margin: "0 auto",
            minHeight :400,
            maxHeight :400,
            maxWidth: 320,
            width: 320,
          }
    }
    return(
        <div>
            <img src={`${API}/products/photo/${product._id}`} style={style.media} alt={product.name}/>
        </div>
    )
}

export default Image