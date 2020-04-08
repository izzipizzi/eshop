import React from 'react'

import Layout from '../core/Layout'

import {isAuth} from '../auth/index'
import { Link } from 'react-router-dom'


const AdminDashboard = ()=>{

    const {
        user : {_id,name,email,role}
    } = isAuth()
    const adminLinks=()=>{
        return (
            <div className='card mb-5'>
               
               <h4 className='card-header'>Одмен linkes</h4>
               <ul className='list-group '>
                    <li className='list-group-item'>
                        <Link className='nav-link' to ='/сreate/category'>
                            Створити категорію
                        </Link>
                    </li>
                    <li className='list-group-item'>
                        <Link className='nav-link' to='/сreate/product'>
                            Створити продукт
                        </Link>
                    </li>
                </ul>
            </div>
        )
    }
    const adminInfo=()=>(
        <div className = 'card mb-5'>
        <h3 className='card-header '>Інформація про юзера</h3>
        <ul className='list-group'>
            <li className='list-group-item'>{name}</li>
            <li className='list-group-item'>{email}</li>
            {/* поміняти(()) */}
            <li className='list-group-item'>{role == 1 ? 'Aka GOD':'смертний юзер'}</li>
        </ul>
    </div>
    )
    

    return(
       <Layout
            className ='container-fluid'
            title = 'Профіль'
            description = {`Hello ${name}`}

        >
            
          <div className='row'>
              <div className='col-3'>
              {adminLinks()}
              </div>
              <div className='col-9'>
                {adminInfo()}
               
              </div>

          </div>
           
        </Layout>
    )
}

export default AdminDashboard