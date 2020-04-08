import React, { useState } from 'react'
import {Redirect} from 'react-router-dom'

import {signin,authenticate,isAuth} from '../auth/index'
import Layout from '../core/Layout'


const Signup = ()=>{
    // стан компонента 
    const [values,setValues] = useState({
       
        email : 'kircheiandri@gmail.com',//потім забрати!
        password : 'qwerty',//потім забрати!
        error : '',
        loading : false,
        redirectToReferrer : false
    })

    const {email,password,error,loading,redirectToReferrer} = values
    const {user} = isAuth()

    //обробник інпутів з форми
    const handleChange = name => event =>{
        setValues({...values, error: false, [name] : event.target.value})

    }
    

    const clickSubmit = event =>{
        event.preventDefault()

        setValues({...values,error : false, loading : true})

        signin({email,password})
        .then(data=>{
            if(data.error){
                setValues({...values, error : data.error, loading : false})

            }else{
               authenticate(data,()=>{
                setValues({
                    ...values,
                    redirectToReferrer : true
                })
               })
            }
        })


    }

    const signInForm = ()=>{
        return(
            <form>
                {/* <div className ='form-group'>
                    <label className ='text-muted'>Name</label>
                    <input 
                        onChange={handleChange('name')} 
                        type ='text' 
                        className='form-control'
                        value={name}

                        
                        />
                </div> */}
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
                <button onClick={clickSubmit} className='btn btn-primary'>Увійти</button>
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
    const showLoading =()=>(
        loading && (
        <div className="spinner-border text-info" role="status">
            <span className="sr-only">Loading...</span>
        </div>)
    )

    const redirectUser = () =>{
        if(redirectToReferrer){
            if (user && user.role === 1) {
                return <Redirect to = '/admin/dashboard'/>
            }else{
                return <Redirect to = '/user/dashboard'/>
            }
            // return <Redirect to = '/'/>
        }
    }

    return(
        <Layout 
            title="SignIn"
            description =" Sign in to Kursova eshopee"
            clasName = 'container col-md-8 offset-md-2'
        >
        {showLoading()}
        {showError()}
        {signInForm()}
        {redirectUser()}
        </Layout>
    )
}
export default Signup