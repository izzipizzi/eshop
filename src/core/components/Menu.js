import React, {Fragment} from 'react'
import {Link, withRouter} from 'react-router-dom'

import {signout, isAuth} from '../../auth/index'

import '../../styles/menu.css'
import shopCart from '../../img/shop-cart.png'
import logo from '../../img/logo.png'

const isActive = (history, path) => {
  if (history.location.pathname === path) {

   
    
    return ({color: '#343e5c'})

  } else {
    return ({})
  }
}

const Menu = ({history}) => {
  const count = 10;
  return (
    <div className='nav-menu'>
      <div className='nav-menu left-block'>
        <ul>
          <li className='menu-logo'>
            <Link to='/' style={isActive(history, '/')}><img src={logo} alt="тут лого"/></Link>
          </li>
        </ul>
      </div>
      <div className='nav-menu center-block'>
        <ul>
          <li>
            <Link to='/' style={isActive(history, '/')}>Home</Link>
          </li>
          <li>
            <Link to='/devices' style={isActive(history, '/devices')}>Devices</Link>
          </li>
          <li>
            <Link to='/delivery-payment' style={isActive(history, '/delivery-payment')}>Delivery & payment</Link>
          </li>
          <li>
            <Link to='/guarantee' style={isActive(history, '/guarantee')}>guarantee</Link>
          </li>
          <li>
            <Link to='/about-us' style={isActive(history, '/about-us')}>About us</Link>
          </li>
        </ul>
      </div>
      <div className='nav-menu right-block'>
        <ul>
        {isAuth() && isAuth().user.role === 0 && (
           <Fragment>
               {/* <li >
              <Link
                
                style={isActive(history, '/user/dashboard')}
                to='/user/dashboard'>Корзина</Link>
            </li> */}
            <li>
            <Link style={isActive(history,'user/dashboard')}to='/user/dashboard' >
              <img src={shopCart}  alt=''/>
            </Link> 
            <p  >{count}</p>
          </li>
           </Fragment>
          )}
          {isAuth() && isAuth().user.role === 0 && (
            <li >
              <Link
                className='nav-link'
                style={isActive(history, '/user/dashboard')}
                to='/user/dashboard'>Профіль</Link>
            </li>
          )}
          {isAuth() && isAuth().user.role === 1 && (
            <li>
              <Link
                className='nav-link'
                style={isActive(history, '/admin/dashboard')}
                to='/admin/dashboard'>Адмін</Link>
            </li>
          )}

          {!isAuth() && (

            <Fragment>
              <li>
                <Link className='nav-link' style={isActive(history, '/signin')} to='/signin'>

                  Увійти

                </Link>
              </li>
              <li>
                <Link className='nav-link' style={isActive(history, '/signup')} to='/signup'>

                  Реєстрація

                </Link>
              </li>
            </Fragment>

          )}

          {isAuth() && (
            <li>
              <Link
                to='/'
                className='nav-link'
                style={{
                cursor: 'pointer',
                // color: 'rgb(83, 83, 83)'
              }}
                onClick={() => {
                signout(() => {
                  history.push('/')
                })
              }}>
                Вийти
              </Link>
            </li>
          )}

    
        </ul>
      </div>
    </div>
  )

}

export default withRouter(Menu)