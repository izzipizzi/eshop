import React, {Fragment, useEffect} from "react";
import {Link, NavLink} from "react-router-dom";
import logo from '../img/logo.png'
import shopCart from '../img/shop-cart.png'
import css from './Menu.module.css'
// import {userHasToken} from "../reducers/user";


const Menu = (props) => {
    // useEffect(()=>{props.userHasToken()})
    // useEffect(()=>props.getUserAuth(localStorage.userId,localStorage.jwt))

    // debugger
    console.log(props.user)
    return (
        <div className={css.navMenu}>
            <div className={`${css.navMenu} ${css.leftBlock}`}>
                <ul className={css.ul}>
                    <li className={css.menuLogo}>
                        <NavLink to='/'><img src={logo} alt="тут лого"/></NavLink>
                    </li>
                </ul>
            </div>
            <div className={`${css.navMenu} ${css.centerBlock}`}>
                <ul className={css.ul}>
                    <li className={css.li}>
                        <NavLink to='/' exact activeClassName={css.activeLink}>Home</NavLink>
                    </li>
                    <li className={css.li}>
                        <NavLink to='/shop' activeClassName={css.activeLink}>Shop</NavLink>
                    </li>
                    <li className={css.li}>
                        <NavLink to='/delivery-payment' activeClassName={css.activeLink}>Delivery&payment</NavLink>
                    </li>
                    <li className={css.li}>
                        <NavLink to='/guarantee' activeClassName={css.activeLink}>guarantee</NavLink>
                    </li>
                    <li className={css.li}>
                        <NavLink to='/about-us' activeClassName={css.activeLink}>About us</NavLink>
                    </li>
                </ul>
            </div>
            <div className={`${css.navMenu} ${css.rightBlock}`}>
                <ul  className={css.ul}>
                    {props.user.role === 0 ? (<li className={css.li}>
                        <NavLink to={'/user/profile'} activeClassName={css.activeLink}>Profile</NavLink>
                    </li>) : null}
                    {console.log(props.user.role)}
                    {props.user.role && props.user.role === 1 ? (<li  className={css.li}>
                        <NavLink to={'/admin/profile'} activeClassName={css.activeLink}>Admin profile</NavLink>
                    </li>) : null}
                    {props.user.role === undefined ? (<li className={css.li}>
                        <NavLink to={'/signin'} activeClassName={css.activeLink}>Sign in</NavLink>
                    </li>) : null}
                    {props.user.role === undefined ? (<li className={css.li}>
                        <NavLink to={'/signup'} activeClassName={css.activeLink}>Sign up</NavLink>
                    </li>) : null}
                    {props.user.role && props.user.role===1 || props.user.role===0 ? (<li className={css.li}>
                        <Link to={'/'} onClick={() => {
                            props.userSignOut()
                        }}>signout</Link>
                    </li>) : null}
                </ul>

            </div>

        </div>
    )
}
export default Menu