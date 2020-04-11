import React,{lazy} from 'react'
import { API } from '../../config'

import LazyLoad from '../../LazyLoad'


const style ={
    maxHeight :'100%',
    maxWidth :'100%'

}

const ProductImage = ({item,url})=>{
    
    return(
        <div>
            <img src={`${API}/${url}/photo/${item._id}`} alt={item.name} className='mb-3' style={style}/>
        </div>

    )
    
}

export default ProductImage