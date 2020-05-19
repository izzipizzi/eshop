import React from 'react'
import {Link, withRouter} from 'react-router-dom'

import logo from '../../img/logo.png'
import '../../styles/footer.css'

import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';

import FacebookIcon from '@material-ui/icons/Facebook';
import YouTubeIcon from '@material-ui/icons/YouTube';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';









const Footer = () => {
  return (
    <div className='footer'>
            <div className ='container'>

      <div className='top-footer'>
        <div className='nav-menu left-block'>
          <ul>
            <li className='menu-logo'>
              <Link to='/'><img src={logo} alt="тут лого"/></Link>
            </li>
          </ul>
        </div>
        <div className=' nav-menu center-block'>
          <ul>
              <li>
                 <Link to ='/'> Home
              </Link>
              </li>
              <li>
              <Link to ='/shop'>
                  Shop</Link>
              </li>
              <li>
              <Link to ='/team'>
                  Team</Link>
              </li>
              <li>
              <Link to ='/about-us'>
                  About us</Link>
              </li>
              <li>
              <Link to ='/contacts'>
                  Contacts</Link>
              </li>
          </ul>
        </div>
        <div className='nav-menu right-block'>
            <ul>
                <li>
                  <a href='https://www.facebook.com/'><FacebookIcon/></a>

                </li>
                <li>
                <a href='https://www.youtube.com/'><YouTubeIcon/></a>

                </li>
                <li>
                <a href='https://www.instagram.com/'><InstagramIcon/></a>

                </li>
                <li>
                <a href='https://www.twitter.com/'><TwitterIcon/></a>

                </li>
            </ul>
        </div>
        

      </div>
      <div className='bottom-footer'>
          <div className='footer-left'>
              Цей сайт був написанй в муках но рект годна штука
          </div>
          <div className='footer-right'>
              <ul>
                  <li>Правила і політика сайту</li>
                  <li>Безпека данних</li>
              </ul>
          </div>
      </div>
      </div>
    </div>
  )
}
export default Footer