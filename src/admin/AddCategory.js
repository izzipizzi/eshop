import React, {useState, Fragment} from 'react'

import Container from '../core/Container'

import {isAuth} from '../auth/index'
import {Link} from 'react-router-dom'
import {showError, showSucces} from '../core/components/Alerts'

import {createCategory} from './apiAdmin'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

import {makeStyles} from '@material-ui/core/styles';

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

const AddCategory = () => {
  const classes = useStyles();
  // для успішного добавлення
  const [state,
    setState] = React.useState({open: false, vertical: 'top', horizontal: 'center'});

  const {vertical, horizontal, open} = state;

  const handleClose = () => {
    setState({
      ...state,
      open: false
    });
  };
  // ----------------------------------------------

  const [name,
    setName] = useState('')
  const [error,
    setError] = useState(false)
  const [success,
    setSuccess] = useState(false)

  const [successMsg,
    setSuccessMsg] = useState('')

  //destructor

  const {user, token} = isAuth()

  const handleChange = (e) => {
    setError('')
    setName(e.target.value)
    setSuccess(false)
  }
  const clickSubmit = (e) => {
    e.preventDefault()
    setError('')
    setSuccess(false)
    setSuccessMsg('')
    setName(name)
    createCategory(user._id, token, {name}).then(data => {
      console.log(data)

      if (data.err) {

        setName('')
        setError(data.err)
        setSuccess(false)
      } else {
        setName('')
        setError('')
        setSuccess(true)
        setSuccessMsg(data.msg)
        setState({open: true, vertical: 'top', horizontal: 'center'});
      }
    })

  }

  const goBack = () => (
    <div >
      <Link   to='/admin/dashboard' className ='link'>Назад до адмінки</Link>
    </div>
  )

  const newCategory = () => (
    <div className='container-form'>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={clickSubmit}>
          <h1 className='block-header'>Добавити категорію</h1>
        <TextField // добвити коли буде помилка
          error={error
          ? true
          : false} id={error
          ? "outlined-error-helper-text"
          : null} helperText={error
          ? error
          : 'Назва створюваної категорії'} label={error
          ? "Перевірте коректність данних"
          : ""} placeholder='Введіть назву' onChange={handleChange} type='text'
          value={name}/>

        <Button variant="outlined" color="primary" type='submit'>
          Добавити
        </Button>
      </form>

    </div>
  )
  return (

    <Container className='container'>
      <div className="row">

        <div className='col-md-8 offset-md-2'>

          <Snackbar
            anchorOrigin={{
            vertical,
            horizontal
          }}
            key={`${vertical},${horizontal}`}
            open={open}
            onClose={handleClose}
            message={successMsg}/> {newCategory()}
          {goBack()}
        </div>

      </div>

    </Container>
  )
}
export default AddCategory