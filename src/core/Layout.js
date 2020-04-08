import React from 'react'
import Menu from './Menu'


const Layout = ({title= 'Title',description ='Description',clasName,children})=>{
    return(
        <div>
            <Menu/>
            <div className ='jumbotron'>
                <h2>{title}</h2>
                <p className='lead'>{description}</p>
            </div>
            <div className ={clasName}>
                {children}
            </div>
        </div>
    )
}
export default Layout