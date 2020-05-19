import React,{lazy} from 'react'
import { API } from '../../config'

import LazyLoad from '../../LazyLoad'



const ImgToLoad = lazy(()=>import('./ProductImage'))

const LazyImage = (props) => <LazyLoad component={ImgToLoad} {...props} />

const Image = ({className,item,url})=>{
    
    return(

        <div className ={className}>
        
          <LazyImage item={item} url={url}/>

        </div>

    )
    
}

export default Image