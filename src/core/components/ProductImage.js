import React,{lazy, Fragment} from 'react'
import { API } from '../../config'

import LazyLoad from '../../LazyLoad'


const style ={
    maxHeight :'100%',
    maxWidth :'100%'

}

const ProductImage = ({item,url})=>{

    
    
    return(
        // <Fragment>
            <img src={`${API}/${url}/photo/${item._id}`} alt={item.name} style={style}/>
        // </Fragment>

    )
    
}

export default ProductImage