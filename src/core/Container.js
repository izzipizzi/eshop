import React from 'react'
import Menu from './components/Menu'


const Container = ({className,children})=>{
    return(
        <div>
            <Menu/>
            
            
            <div className ={className} >
                {children}
            </div>
        </div>
    )
}
export default Container