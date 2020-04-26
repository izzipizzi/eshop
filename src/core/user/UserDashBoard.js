import React from 'react'


import {isAuth} from '../../auth/index'
import {Link} from 'react-router-dom'

import Container from '../Container'

import '../../styles/userprofile.css'

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
      <div className='profile-left-block'>

        <h1 className='block-header'>Useer linkes</h1>
        <ul >
          <li >
            <Link className ='link'   to='/cart'>Corsina</Link>
          </li>
          <li >
            <Link  className ='link' to='/profile/update'>Update profile</Link>
          </li>
        </ul>
      </div>
    )
  }
  const userInfo = () => (
    <div className='profile-right-block'>
      <h3 className='block-header '>Інформація про юзера</h3>
      <ul >
        <li >Ім'я : {name}</li>
        <li >Пошта: {email}</li>
        {/* поміняти(()) */}
        <li >{role == 1
            ? 'Aka GOD'
            : 'смертний юзер'}</li>
      </ul>
    </div>
  )
  const purchaseHistory = () => (
    <div className='profile-right-block'>
      <h3 className='block-header'>Історія покупок буде скоро</h3>
      <li className=''>--------------------</li>

    </div>
  )

  return (
    <Container
    className='container'>

        
      <div className='profile-container'>
          <div className='profile-links'>
            {userLinks()}
          </div>
          <div className='profile-info'>
            {userInfo()}
            {purchaseHistory()}
          </div>

      </div>
    </Container>
  )
}

export default Dashboard