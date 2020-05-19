import React, { Component, Suspense } from 'react'

import './style.css'


const loading = () =>(
    <div className="lds-facebook"><div></div><div></div><div></div></div>
)



const LazyLoad = ({component: Component,...props}) =>(
    <div>
        <Suspense fallback={loading()}>
            <Component {...props} />
        </Suspense>
    </div>
)

export default LazyLoad