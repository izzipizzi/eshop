import React from 'react'
import Menu from './components/Menu'
import Footer from './components/Footer'


const Container = ({className,children})=>{
    return(
        <div>
            <Menu/>
            
            
            <div className ={className} >
                {children}
            </div>
            <Footer/>

        </div>
    )
}
export default Container