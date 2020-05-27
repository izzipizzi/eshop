import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import Container from "../Container";
import css from './Profile.module.css'
import {userHasToken} from "../reducers/user";

const Profile =(props) =>{

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
                {console.log(props.user)}
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
export default Profile