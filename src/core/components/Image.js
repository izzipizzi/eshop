import React,{lazy} from 'react'
import { API } from '../../config'

import LazyLoad from '../../LazyLoad'



const ImgToLoad = lazy(()=>import('./ProductImage'))

const LazyImage = (props) => <LazyLoad component={ImgToLoad} {...props} />

const Image = ({item,url})=>{
    
    return(

        <div className ='product-img'>
        
          <LazyImage item={item} url={url}/>

        </div>

    )
    
}

export default Image