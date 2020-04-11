import React, {useState, Fragment} from 'react'

import Layout from '../core/Layout'

import {isAuth} from '../auth/index'
import {Link} from 'react-router-dom'
import {showError,showSucces} from '../components/alerts'

import {createCategory} from './apiAdmin'

const AddCategory = () => {
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
    createCategory(user._id,token,{name})
    .then(data=>{
      console.log(data)

      if(data.err){
       
        setName('')
        setError(data.err)
        setSuccess(false)
      }else{
        setName('')
        setError('')
        setSuccess(true)
        setSuccessMsg(data.msg)
      }
    })
    
  }
  // const successMsgComponent = () =>{
  //   return {}
  // }
  const goBack = () => (
    <div className=' mt-5'>
      <Link to='/admin/dashboard' className='text-warning'>Назад до адмінки</Link>
    </div>
  )

  const newCategory = () => (
    <form onSubmit ={clickSubmit}>
      <div className='form-group'>
        <label className='text-muted'>
          Name
        </label>
        <input type='text' className='form-control' onChange ={handleChange}/>
       
      </div>
      < button className='btn btn-outline-primary'>
          Add catagory</button>
    </form>
    ) 
    return(
      
    <Layout title='add category' description ={`Назва створюваної категорії ${name}`}>
      <div className="row">
     
        <div className='col-md-8 offset-md-2'>
        {showError(error)}
      {showSucces(success,successMsg)}
          {newCategory()}
          {goBack()}
          </div>
          
      </div>

     
     
    </Layout>
    )
}
export default AddCategory