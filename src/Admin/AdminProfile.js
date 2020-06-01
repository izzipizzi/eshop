import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import Container from "../Container";
import css from './AdminProfile.module.css'
import {userHasToken} from "../reducers/user";

const AdminProfile =(props) =>{

    const userLinks = () => {
        return (
            <div className='profile-left-block'>

                <h1 className='block-header'>Odmen linkes</h1>
                <ul >
                    <li>
                        <Link  className ='link' to ='/admin/product'>
                            Адміністрування товарів виробників, категорій
                        </Link>
                    </li>

                </ul>
            </div>
        )
    }
    const userInfo = () => (
        <div className='profile-right-block'>
            <h3 className='block-header '>Інформація про юзера</h3>
            <ul >
                <li >Ім'я : {props.user.name}</li>
                <li >Пошта: {props.user.email}</li>
                {/* поміняти(()) */}
                <li >{props.user.role === 1
                    ? 'Aka GOD (admin)'
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


    return(<Container className={'container'}>

        <div className={css.profileContainer}>
            <div className={css.profileLinks}>
                {userLinks()}
            </div>
            <div className={css.profileInfo}>
                {userInfo()}
                {purchaseHistory()}
            </div>

        </div>
    </Container>)
}
export default AdminProfile