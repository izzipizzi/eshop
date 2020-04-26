import React, {useState} from 'react'
import {Redirect} from 'react-router-dom'

import {signin, authenticate, isAuth} from '../auth/index'

import Container from './Container'
import Menu from './components/Menu'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';

import '../styles/form.css'

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

const Signin = () => {
  const classes = useStyles();

  const [values,
    setValues] = useState({

    email: 'kircheiandri@gmail.com', //потім забрати!
    password: 'qwerty', //потім забрати!
    error: '',
    loading: false,
    redirectToReferrer: false
  })

  const {email, password, error, loading, redirectToReferrer} = values
  const {user} = isAuth()

  //обробник інпутів з форми
  const handleChange = name => event => {
    setValues({
      ...values,
      error: false,
      [name]: event.target.value
    })

  }

  const clickSubmit = event => {
    event.preventDefault()

    setValues({
      ...values,
      error: false,
      loading: true
    })

    signin({email, password}).then(data => {
      if (data.err) {
        setValues({
          ...values,
          error: data.err,
          loading: false
        })

      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToReferrer: true
          })
        })
      }
    })

  }

  const handleClose = () => {
    setValues({loading:false});
  };

  const signInForm = () => {
    return (
      <div className='container-form'>
        <h1>Авторизація</h1>
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
            : ""} placeholder='Логін' onChange={handleChange('email')} type='email' value={email}/>
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
            Авторизуватись
          </Button>
        </form>

      </div>
    )
  }

  const redirectUser = () => {
    if (redirectToReferrer) {
      if (user && user.role === 1) {
        return <Redirect to='/admin/dashboard'/>
      } else {
        return <Redirect to='/user/dashboard'/>
      }
      // return <Redirect to = '/'/>
    }
  }
  const showLoading = () => (loading && (
    <Backdrop className={classes.backdrop} open={loading} onClick={handleClose}>
      <CircularProgress color="inherit"/>
    </Backdrop>
  ))

  const showError = () => (
    <div style={{
      display: error
        ? ''
        : 'none'
    }}>

      {error}
    </div>
  )

  return (
    <Container className='container'>
      {showLoading()}
      {showError()}
      {signInForm()}
      {redirectUser()}
    </Container>
  )
}

export default Signin