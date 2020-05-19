import React, {useState, useEffect} from 'react'

import Container from './Container'
import SearchBar from './components/SearchBar'

// import ProductCard from './components/ProductCard'

import {getProducts, getRandomProduct, getManufacturerRelatedProduct} from './apiCore'
import MySlider from './components/Slider'
import ProductCard from './components/ProductCard'

import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import {makeStyles} from '@material-ui/core/styles';
import ProductSet from './components/ProductSet'
const useStyles = makeStyles((theme) => ({

  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
}));
const Home = () => {

  const [loading,
    setLoading] = useState(false);
  const classes = useStyles();

  const showLoading = () => (loading && (
    <Backdrop className={classes.backdrop} open={loading}>
      <CircularProgress color="inherit"/>
    </Backdrop>
  ))

  const [productsBySell,
    setProductsBySell] = useState([])

  // const [sliderProducts,   setSliderProducts] = useState([])

  const [productsByArrival,
    setProductsByArrival] = useState([])
  const [sliderProducts,
    setSliderProducts] = useState([])

  //курсова---------------------------
  const [setOfProducts,
    setSetOfProducts] = useState([])
  const [randomProduct,
    setRandomProduct] = useState({})
  const [relatedProduct,
    setRelatedProduct] = useState({})

  const loadRandomProduct = () => {

    getRandomProduct().then(data => {
      if (data.error) {
        setError(data.error)

      } else {
        setRandomProduct(data)
        console.log('setRandomProduct' + randomProduct._id)

      }
    })

  }

  useEffect(() => {
    loadRelatedProduct(randomProduct._id)

  }, [randomProduct])
  // -------------------------------------------
  useEffect(() => {
    setSetOfProducts([randomProduct, relatedProduct])

  }, [randomProduct, relatedProduct])
  const [error,
    setError] = useState(false)

  const loadProductsBySell = () => {
    getProducts('sold').then(data => {
      if (data.error) {
        setError(data.error)

      } else {
        setProductsBySell(data)

      }
    })
  }
  const loadProductsByArrival = () => {
    getProducts('createdAt', 8).then(data => {
      if (data.error) {
        setError(data.error)

      } else {
        setProductsByArrival(data)

      }
    })
  }
  const loadProductsForSlider = () => {
    getProducts('sold').then(data => {
      if (data.error) {
        setError(data.error)

      } else {
        setSliderProducts(data)
        setLoading(false)

      }
    })
  }
  const loadRelatedProduct = (id) => {

    getManufacturerRelatedProduct(id).then(data => {
      // getManufacturerRelatedProduct('5ea6a82c755e6f3a5c07d0bb').then(data=>{
      console.log('getManufacturerRelatedProduct')
      if (data.error) {
        setError(data.error)

      } else {
        setRelatedProduct(...data)

      }

    })

  }

  useEffect(() => {
    setLoading(true)

    loadRandomProduct()

    loadProductsByArrival()
    loadProductsBySell();
    loadProductsForSlider();

  }, [])

  // ДЛЯ  СЛАЙДЕРА
  const settings = {
    dots: true,
    autoplay: true,
    lazyLoad: true,

    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <Container className='home content'>

      <div className='container home'>
        <SearchBar/>
      </div>
      {showLoading()}
      <MySlider className='slider' settings={settings} products={productsBySell}/>

      <div className='container'>
        <div className="content-header">
          <h2>Топ продаж</h2>
        </div>
        <div className='card-holder'>

          {productsBySell.map((product) => {
            return (<ProductCard product ={product} key ={product._id}/>)
          })}
        </div>

      </div>
     Набір товарів
      {/* {JSON.stringify(randomProduct)} */}
      <ProductSet products={setOfProducts}/>

      {/* {JSON.stringify(relatedProduct)} */}

    </Container>
  )

}
export default Home