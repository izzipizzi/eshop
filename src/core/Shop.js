import React, {useState, useEffect} from 'react'

import ProductCard from './components/ProductCard'
import CheckBox from './components/CheckBox'
import Layout from "./Layout"

import {getCategories} from './apiCore'

const Shop = () => {
  const [categories,
    setCategories] = useState([])
  const [error,
    setError] = useState(false)
  const [myFilters,
    setMyfilters] = useState({
    filters: {
      category: [],
      price: []
    }
  })

  const handleFilters = (filters, filterBy) => {
    // console.log(filters, filterBy)
    const newFilters = {
      ...myFilters
    }
    newFilters.filters[filterBy] = filters
    setMyfilters(newFilters)
  }

  const init = () => getCategories().then(data => {
    if (data.err) {
      setError(data.err)

    } else {
      setCategories(data)
    }
  })

  useEffect(() => {
    init()
  }, [])

  return (
    <Layout
      title="Shop"
      description="Kursova eshopee page"
      className='container-fluid'>

      <div className='row'>
        <div className='col-4'>
          <h2>
            Список категорій</h2>
          <ul>
            <CheckBox
              categories={categories}
              handleFilters={filters => handleFilters(filters, 'category')}/>
          </ul>
          <div data-role="rangeslider">
        <label for="price-min">Price:</label>
        <input type="range" name="price-min" id="price-min" value="200" min="0" max="1000"/>
        <label for="price-max">Price:</label>
        <input type="range" name="price-max" id="price-max" value="800" min="0" max="1000"/>
      </div>
        </div>
        <div className='col-8'>
          Right{JSON.stringify(myFilters)}
        </div>
      </div>
    </Layout>
  )
}
export default Shop