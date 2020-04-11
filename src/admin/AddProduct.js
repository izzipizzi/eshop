import React, {useState, Fragment, useEffect} from 'react'

import Layout from '../core/Layout'

import {isAuth} from '../auth/index'
import {Link} from 'react-router-dom'
import {showError, showSucces} from '../components/alerts'

import {createProduct, getCategories} from './apiAdmin'

const AddProduct = () => {

  const {user, token} = isAuth()
  const [values,
    setValues] = useState({
    name: '',
    description: '',
    price: '',
    categories: [],
    category: '',
    shipping: '',
    quantity: '',
    photo: '',
    loading: false,
    error: '',
    createdProduct: '',
    redirectToProfile: false,
    formData: '',
    success: false,
    successMsg: ''

  })

  const {
    name,
    description,
    price,
    categories,
    category,
    shipping,
    quantity,
    photo,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData,
    success,
    successMsg
  } = values

  //загрузка ктегорый з бд
  const init = () => getCategories().then(data => {
    if (data.err) {
      setValues({
        ...values,
        error: data.err
      })

    } else {
      setValues({
        ...values,
        categories: data,
        formData: new FormData()
      })
    }
  })

  useEffect(() => {
    init()
    // setValues({   ...values,   formData: new FormData() })
  }, [])

  const handleChange = (name) => event => {
    const value = name === 'photo'
      ? event.target.files[0]
      : event.target.value;
    formData.set(name, value)
    // console.log(name,value)
    setValues({
      ...values,
      [name]: value
    })

    // console.log(formData.getAll(name))

  }
  const clickSubmit = event => {
    event.preventDefault()

    setValues({
      ...values,
      error: '',
      loading: true,
      succes: false,
      successMsg: ''
    })

    createProduct(user._id, token, formData).then(data => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          succes: false,
          successMsg: ''

        })
        console.log(error)
      } else {
        setValues({
          ...values,
          name: '',
          description: '',
          price: '',
          photo: '',
          shipping: '',
          quantity: '',
          loading: false,
          success: true,
          error: '',
          successMsg: data.msg,
          createdProduct: data.name
        })
        console.log(data.msg)

      }
    })
    // init()
  }
  const newPostForm = () => (
    <form className='mb-3' onSubmit={clickSubmit}>
      <h4>Post Photo</h4>
      <div className='form-group'>
        <label className='btn btn-outline-primary'>
          <input
            onChange={handleChange('photo')}
            type='file'
            name='photo'
            accept='image/*'/>
        </label>
      </div>
      <div className='form-group'>
        <label className='text-muted'>name</label>
        <input
          onChange={handleChange('name')}
          type='text'
          className="form-control"
          value={name}/>

      </div>
      <div className='form-group'>
        <label className='text-muted'>description</label>
        <textarea
          onChange={handleChange('description')}
          className="form-control"
          value={description}/>
      </div>
      <div className='form-group'>
        <label className='text-muted'>price</label>
        <input
          onChange={handleChange('price')}
          type='number'
          className="form-control"
          value={price}/>
      </div>
      <div className='form-group'>
        <label className='text-muted'>доставка</label>
        <select onChange={handleChange('shipping')} className="form-control">
          <option>Виберіть доставку</option>
          <option value='0'>No</option>
          <option value='1'>Yes</option>
        </select>
      </div>
      <div className='form-group'>
        <label className='text-muted'>category</label>
        <select onChange={handleChange('category')} className="form-control">
          <option>Виберіть категорію</option>
          {categories && categories.map((cat, index) => {
            return <option value={cat._id} key ={index}>{cat.name}</option>
          })}
        </select>
      </div>
      <div className='form-group'>
        <label className='text-muted'>quantity</label>
        <input
          onChange={handleChange('quantity')}
          type='number'
          className="form-control"
          value={quantity}/>

      </div>
      <button className='btn btn-primary'>add</button>

    </form>
  )

  return (
    <Layout title='add product' description ={`Назва створюваного продукта `}>
      <div className="row">

        <div className='col-md-8 offset-md-2'>
          {showError(error)}
          {showSucces(success, successMsg)}
          {newPostForm()}
        </div>

      </div>

    </Layout>
  )
}

export default AddProduct