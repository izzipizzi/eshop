import React, { useState } from 'react'
import {Link} from 'react-router-dom'

import {signup} from '../auth/index'
import Layout from '../core/Layout'


const Signup = ()=>{
    // стан компонента 
    const [values,setValues] = useState({
        name : '',
        email : '',
        password : '',
        error : '',
        success : false
    })

    const {name,email,password,success,error} = values

    //обробник інпутів з форми
    const handleChange = name => event =>{
        setValues({...values, error: false, [name] : event.target.value})

    }
    

    const clickSubmit = event =>{
        event.preventDefault()

        setValues({...values,error : false})

        signup({name,email,password})
        .then(data=>{
            if(data.error){
                setValues({...values, error : data.error, success : false})

            }else{
                setValues({...values,
                    name : '',
                    email : '',
                    password : '',
                    error : '',
                    success : true})
            }
        })


    }

    const signUpForm = ()=>{
        return(
            <form>
                <div className ='form-group'>
                    <label className ='text-muted'>Name</label>
                    <input 
                        onChange={handleChange('name')} 
                        type ='text' 
                        className='form-control'
                        value={name}

                        
                        />
                </div>
                <div className ='form-group'>
                    <label className ='text-muted'>Email</label>
                    <input 
                        onChange={handleChange('email')} 
                        type ='email' 
                        className='form-control'
                        value={email} 
                        
                        />
                </div>
                <div className ='form-group'>
                    <label className ='text-muted'>Password</label>
                    <input 
                        onChange={handleChange('password')} 
                        type ='password'
                        className='form-control'
                        value={password} 
                        
                        />
                </div>
                <button onClick={clickSubmit} className='btn btn-primary'>Signup</button>
            </form>
        )       
    }

    const showError =()=>(
        <div className ='alert alert-danger'style={
            {display: error ? '' : 'none'}
        }>
            {error}
        </div>
    )
    const showSucces =()=>(
        <div className ='alert alert-success'style={
            {display: success ? '' : 'none'}
        }>
            Створено новий акаунт Будь-ласка <Link to='/signin'>увійдіть</Link> 
        </div>
    )

    return(
        <Layout 
            title="Signup"
            description =" Sign up to Kursova eshopee"
            clasName = 'container col-md-8 offset-md-2'
        >
        {showSucces()}
        {showError()}
        {signUpForm()}
        </Layout>
    )
}
export default Signup