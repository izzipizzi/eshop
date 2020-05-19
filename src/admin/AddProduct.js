import React, {useState, Fragment, useEffect} from 'react'

import Container from '../core/Container'

import {isAuth} from '../auth/index'
import {Link} from 'react-router-dom'
import {showError, showSucces} from '../core/components/Alerts'

import {createProduct, getCategories,getDeliveries,getManufactures,getCategoriesAndDeliveries} from './apiAdmin'

import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Snackbar from '@material-ui/core/Snackbar';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';



const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    }
  },
  input: {
    display: 'none'
  }
}));

const AddProduct = () => {
  const classes = useStyles();

  const {user, token} = isAuth()
  const [values,
    setValues] = useState({
    name: '',
    description: '',
    price: '',
    deliveries: [],
    categories: [],
    manufactures:[],
    category: '',
    shipping: '',
    manufacturer: '',
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
  const [radioErr,setRadioErr] = useState(false)
  const [helperText, setHelperText] = useState('')

  const [photoLabel,
    setPhotoLabel] = useState('Загрузити фото')

  const {
    name,
    description,
    price,
    categories,
    deliveries,
    manufactures,
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


  const init = () => getCategoriesAndDeliveries().then(data => {
    if (data.err) {
      setValues({
        ...values,
        error: data.err
      })

    } else {
      
      
      // setValues({
      //   ...values,
      
      //   categories: data.categories,
      //   deliveries: data.deliveries,
      //   // formData: new FormData()
      // })
      
      console.log(categories);
    }
  }).then((data)=>{
    // loadManufactures()
    getManufactures().then(manufacturersData=>{
      if (manufacturersData.err) {
        setValues({
          ...values,
          error: manufacturersData.err
        })
  
      } else {

        console.log(manufacturersData)

        setValues({
          ...values,      
            categories: data.categories,
        deliveries: data.deliveries,
          manufactures: manufacturersData.manufactures,
          formData: new FormData()
  
        })
        
        console.log(manufactures);
      }
    })
  })

  const load = new Promise((resolve,reject)=>{
    getCategoriesAndDeliveries().then(data=>{

      if (data.err) {
        setValues({
          ...values,
          error: data.err
        })
  
      } else {
        
        resolve(data)
        
       
        
        // console.log(categories);
      
      }
    
    })
  })
  
  
  // const loadManufactures = () => getManufactures().then(data=>{
  //   if (data.err) {
  //     setValues({
  //       ...values,
  //       error: data.err
  //     })

  //   } else {
      
      
  //     setValues({
  //       ...values,      
  //       manufactures: data.manufactures,
  //       formData: new FormData()

  //     })
      
  //     console.log(manufactures);
  //   }
  // })
  


  useEffect(() => {
  //  init()
  //  loadManufactures()
  load.then(data=>{
    getManufactures().then(mData=>{
     
      
      if (data.err) {
        setValues({
          ...values,
          error: data.err
        })
  
      } else {
        
        setValues({
          ...values,      
            categories: data.categories,
            deliveries: data.deliveries,
            manufactures: mData.manufactures,
          formData: new FormData()
  
        })

        console.log(data,mData)
        console.log(manufactures)
      
      }

    })
  })

  }, [])

  const handleChange = (name) => event => {
    const value = name === 'photo'
      ? (event.target.files[0]
      )
      : event.target.value;
      setPhotoLabel("Вибрано")
    formData.set(name, value)
    
     console.log(name,value)
    setValues({
      ...values,
      [name]: value
    })

   

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
          name: '',
          description: '',
          price: '',
          deliveries: [],
          categories: [],
          manufactures:[],
          category: '',
          shipping: '',
          manufacturer: '',
          quantity: '',
          photo: '',
          loading: false,
          error: '',
          createdProduct: '',
          redirectToProfile: false,
          formData: '',
          success: false,
          successMsg: data.msg
        })
        setPhotoLabel('Загрузити фото')
        
        setState({ open: true,vertical: 'top', horizontal: 'center' } );

        console.log(data.msg)

      }
    })
   
  }
  
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal, open } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
    setValues({
      name: '',
    description: '',
    price: '',
    deliveries: [],
    categories: [],
    manufactures: [],
    
    category: '',
    shipping: '',
    manufacturer: '',
    quantity: '',
    photo: '',
    loading: false,
    error: '',
    createdProduct: '',
    redirectToProfile: false,
    formData: '',
    success: false,
    successMsg: ''})
    document.location.reload();
  };

  const newPostForm = () => (
    <div className='container-form'>
        <form  onSubmit={clickSubmit}>
      <h1 className='block-header'>Добавити товар</h1>

      <div className='container-form-item'>
      <div className={classes.root}>
        <label className='btn btn-outline-primary'>
          <input onChange={handleChange('photo')} // type='file'
            // name='photo'
            // multiple
            accept="image/*" className={classes.input} id="contained-button-file" multiple type="file"/>
          <Button variant="contained" color="primary" component="span">
            {photoLabel}
          </Button>
        </label>

      </div>
      </div>
    
 <div className='container-form-item'>
 <TextField
        error={error
        ? true
        : false}
        id={error
        ? "outlined-error-helper-text"
        : null}
        helperText={error
        ? error
        : ''}
        label={error
        ? "Перевірте коректність данних"
        : "Назва товару"}
        placeholder='Введіть назву'
        onChange={handleChange('name')}
        type='text'
        value={name}/>

      </div>
      <div className='container-form-item'>
      <TextField
        multiline
        error={error
        ? true
        : false}
        id={error
        ? "outlined-error-helper-text"
        : null}
        helperText={error
        ? error
        : ''}
        label={error
        ? "Перевірте коректність данних"
        : "Опис товару"}
        placeholder='Введіть опис'
        onChange={handleChange('description')}
        type='text'
        value={description}/>
        </div>
        <div className='container-form-item'>
        <TextField
        error={error
        ? true
        : false}
        id={error
        ? "outlined-error-helper-text"
        : null}
        helperText={error
        ? error
        : ''}
        label={error
        ? "Перевірте коректність данних"
        : "Ціна товару"}
        placeholder='Введіть ціну'
        onChange={handleChange('price')}
        type='text'
        value={price}
        shrink/>
        </div>
        <div className='container-form-item'>


        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
Виберіть категорію
        </InputLabel>
        <RadioGroup aria-label="quiz" name="shipping" value={shipping} onChange={handleChange('shipping')}>
            {deliveries && deliveries.map((sh, index) => {
                        return <FormControlLabel value={sh._id} key ={index} control={<Radio />} label={sh.name}/>
            })}
          {/* <FormControlLabel value="best" control={<Radio />} label="The best!" />
          <FormControlLabel value="worst" control={<Radio />} label="The worst." /> */}
        </RadioGroup>
        <FormHelperText>{helperText}</FormHelperText>
        
        {/* <InputLabel shrink id="demo-simple-select-placeholder-label-label">
        Виберіть доставку
                </InputLabel>
              <Select id='select' onChange={handleChange('shipping')} value={values.shipping  || ''}>
                  <MenuItem>
                    Виберіть доставку
                  </MenuItem>
                  {deliveries && deliveries.map((sh, index) => {
                    return <MenuItem value={sh._id} key ={index}>{sh.name}</MenuItem>
                  })}
                </Select> */}
        </div>
        <div className='container-form-item'>
        
        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
Виберіть категорію
        </InputLabel>
        <Select id='select' onChange={handleChange('category')} value={values.category  || ''}>
          <MenuItem>
            Виберіть категорію
          </MenuItem>
          {categories && categories.map((cat, index) => {
            return <MenuItem value={cat._id} key ={index}>{cat.name}</MenuItem>
     
          })}
        </Select>
        </div>
        <div className='container-form-item'>
        
        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
Виберіть виробника
        </InputLabel>
          {/*{            console.log(manufactures+'asasf')*/}
          }
        <Select id='select' onChange={handleChange('manufacturer')} value={values.manufacturer  || ''}>
          <MenuItem>
            Виберіть виробника
          </MenuItem>
          {manufactures && manufactures.map((manufacturer, index) => {
            return <MenuItem value={manufacturer._id} key ={index}>{manufacturer.name}</MenuItem>
     
          })}
        </Select>
        </div>
        <div className='container-form-item'>
        <TextField
        error={error
        ? true
        : false}
        id={error
        ? "outlined-error-helper-text"
        : null}
        helperText={error
        ? error
        : ''}
        label={error
        ? "Перевірте коректність данних"
        : "Кількість товару"}
        placeholder='Введіть кількість'
        onChange={handleChange('quantity')}
        type='text'
        value={quantity}/>
        </div> 
    

      


       
    
      
      
      
        <div className='container-form-item'>
      <Button variant="outlined" color="primary" type='submit'>
          Добавити
        </Button>
</div>
    </form>
    <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        key={`${vertical},${horizontal}`}
        open={open}
        onClose={handleClose}
        message={successMsg}
      />
    </div>
    
  )

  return (
    <Container title='add product' description ={`Назва створюваного продукта `}>
      <div className="row">

        <div className='col-md-8 offset-md-2'>
        
          {/* {showSucces(success, successMsg)} */}
          {newPostForm()}
        </div>

      </div>

    </Container>
  )
}

export default AddProduct