import React, { useState, Component, Fragment } from 'react'
import {Link} from 'react-router-dom'

import {signup} from '../auth/index'
import {showError,showSucces} from './components/Alerts'

import Container from '../core/Container'


import Snackbar from '@material-ui/core/Snackbar';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiFormControl-root': {
        margin: 20,
        width: 400,
        color: '#6b7db4'
      }
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff'
    }
  }));

const Signup = ()=>{
    const classes = useStyles();

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
    
    //для показу успішної реєстрації
    const [state, setState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
      });
    
      const { vertical, horizontal, open } = state;
    
      
    
      const handleClose = () => {
        setState({ ...state, open: false });
      };
    
    

    const clickSubmit = (event )=>{

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
                setState({ open: true,vertical: 'top', horizontal: 'center' } );
            }
        })


    }

    const signUpForm = ()=>{
        return(

            <div className='container-form'>
            <h1>Реєстрація</h1>
            <form className={classes.root} noValidate autoComplete="off">
              <TextField // добвити коли буде помилка
                error={error
                ? true
                : false} id={error
                ? "outlined-error-helper-text"
                : null} helperText={error
                ? error
                : null} label={error
                ? "Перевірте коректність данних"
                : ""} placeholder="Ім'я" onChange={handleChange('name')} type='text' value={name}/>
               
          <TextField // добвити коли буде помилка
            error={error
            ? true
            : false} id={error
            ? "outlined-error-helper-text"
            : null} helperText={error
            ? error
            : null} label={error
            ? "Перевірте коректність данних"
            : ""} placeholder='Пошта' onChange={handleChange('email')} type='email' value={email}/>
              <TextField // добвити коли буде помилка
                error={error
                ? true
                : false} id={error
                ? "outlined-error-helper-text"
                : null} helperText={error
                ? error
                : null} label={error
                ? "Перевірте коректність данних"
                : ""} placeholder='Пароль' onChange={handleChange('password')} type='password' value={password}/>
    
              <Button variant="outlined" color="primary" onClick ={clickSubmit}>
                Зареєструватись
              </Button>
            </form>
    
          </div>


        )       
    }
    const redirectSignin = () =>{
      return <Fragment> Створено новий акаунт Будь-ласка <Link style={{color: 'white',textDecoration:'underline'}} to='/signin'>увійдіть</Link> </Fragment> 
    }
    // const showError =()=>(
    //     <div className ='alert alert-danger'style={
    //         {display: error ? '' : 'none'}
    //     }>
    //         {error}
    //     </div>
    // )
    // const showSucces =()=>(
    //     <div className ='alert alert-success'style={
    //         {display: success ? '' : 'none'}
    //     }>
    //         Створено новий акаунт Будь-ласка <Link to='/signin'>увійдіть</Link> 
    //     </div>
    // )

    return(
        <Container 
         
        className='container'
        >
             <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        key={`${vertical},${horizontal}`}
        open={open}
        onClose={handleClose}
        message={redirectSignin()}
      />
        {/* {showSucces(success,redirectSignin())} */}
        {showError(error)}
        {signUpForm()}
        </Container>
    )
}
export default Signup