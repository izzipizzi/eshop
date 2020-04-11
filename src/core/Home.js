import React, {useState, useEffect} from 'react'
import Layout from './Layout'

import ProductCard from './components/ProductCard'
import {getProducts} from './apiCore'

const Home = () => {

    

  const [productsBySell,
    setProductsBySell] = useState([])
  const [productsByArrival,
    setProductsByArrival] = useState([])
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
    getProducts('createdAt').then(data => {
      if (data.error) {
        setError(data.error)

      } else {
        setProductsByArrival(data)
      }
    })
  }
  useEffect(() => {
    loadProductsByArrival()
    loadProductsBySell();
  }, [])
  return (
    <Layout title="Home" description="Kursova eshopee" className='container-fluid'>

      <h2 className='mb-4'>
        Top IN SELL</h2>
      <div className='row'>

        {productsBySell.map((product, index) => (<ProductCard key={index} product={product}/>))}

      </div>

      <h2 className='mb-4'>
        New arrivalLL</h2>
      <div className='row'>
        {productsByArrival.map((product, index) => (<ProductCard key={index} product={product}/>))}
      </div>

    </Layout>
  )
}
export default Home