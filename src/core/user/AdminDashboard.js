import React from 'react'

// import Layout from '../core/Layout'

import {isAuth} from '../../auth/index'
import { Link } from 'react-router-dom'

import Container from '../Container'


import '../../styles/userprofile.css'




const AdminDashboard = ()=>{

    const {
        user : {_id,name,email,role}
    } = isAuth()
    const adminLinks=()=>{
        return (
            <div className='profile-left-block'>
               
               <h4 className='block-header'>Одмен linkes</h4>
               <ul >
                    <li>
                        <Link  className ='link' to ='/сreate/category'>
                            Створити категорію
                        </Link>
                    </li>
                    <li>
                        <Link  className ='link' to='/сreate/product'>
                            Створити продукт
                        </Link>
                    </li>
                </ul>
            </div>
        )
    }
    const adminInfo=()=>(
        <div className = 'profile-right-block'>
        <h3 className='block-header '>Інформація про юзера</h3>
        <ul >
            <li >{name}</li>
            <li >{email}</li>
            {/* поміняти(()) */}
            <li >{role == 1 ? 'Aka GOD':'смертний юзер'}</li>
        </ul>
    </div>
    )
    

    return(
      <Container
      className='container'
      >
    
     <div className='profile-container'>
              <div className='profile-links'>
              {adminLinks()}
              </div>
              <div className='profile-info'>
                {adminInfo()}
               
              </div>

          </div>
      </Container>
        
           
       
    )
}

export default AdminDashboard