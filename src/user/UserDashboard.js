import React from 'react'

import Layout from '../core/Layout'

import {isAuth} from '../auth/index'
import {Link} from 'react-router-dom'

const Dashboard = () => {

  const {
    user: {
      _id,
      name,
      email,
      role
    }
  } = isAuth()
  const userLinks = () => {
    return (
      <div className='card mb-5'>

        <h4 className='card-header'>Useer linkes</h4>
        <ul className='list-group '>
          <li className='list-group-item'>
            <Link className='nav-link' to='/cart'>Corsina</Link>
          </li>
          <li className='list-group-item'>
            <Link className='nav-link' to='/profile/update'>Update profile</Link>
          </li>
        </ul>
      </div>
    )
  }
  const userInfo = () => (
    <div className='card mb-5'>
      <h3 className='card-header '>Інформація про юзера</h3>
      <ul className='list-group'>
        <li className='list-group-item'>{name}</li>
        <li className='list-group-item'>{email}</li>
        {/* поміняти(()) */}
        <li className='list-group-item'>{role == 1
            ? 'Aka GOD'
            : 'смертний юзер'}</li>
      </ul>
    </div>
  )
  const purchaseHistory = () => (
    <div className='card mb-5'>
      <h3 className='card-header'>Історія покупок буде скоро</h3>
      <li className='list-group-item'>--------------------</li>

    </div>
  )

  return (
    <Layout
      className='container-fluid'
      title='Профіль'
      description={`Hello ${name}`}>

      <div className='row'>
        <div className='col-3'>
          {userLinks()}
        </div>
        <div className='col-9'>
          {userInfo()}
          {purchaseHistory()}
        </div>

      </div>

    </Layout>
  )
}

export default Dashboard