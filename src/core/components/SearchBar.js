import React, {useState, useEffect} from 'react';

import '../../styles/searchbar.css'
import {Link} from 'react-router-dom';

import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';


import {makeStyles} from '@material-ui/core/styles';

// import Layout from '../Layout' import {getCategories} from '../apiCore'
// import Card from './ProductCard'

const SearchBar = () => {

  const useStyles = makeStyles((theme) => ({

    selectEmpty: {
      marginTop: theme.spacing(0)
    }
  }));

  //test combobox
  const [age,
    setAge] = useState('all');

  const handleChange = (event) => {
    setAge(event.target.value);

  };
  // -----------------------------------------   const [data,     setData] =
  // useState({categories: [], category: '', search: '', results: [], searched:
  // false})   const {categories, category, search, results, searched} = data
  // const loadCategories = () => { getCategories().then(data => {       if
  // (data.err) { console.log(data.err)       } else {         setData({
  // ...data,       categories: data         })       }     })   }   useEffect(()
  // => { loadCategories()   }, [])

  const searchSubmit = () => {}

  // const handleChange = () => {}

  const searchForm = () => {
    return (

      <form >

        <Select id='select' onChange={handleChange} value={age}>
          <MenuItem value="all">
            Виберіть категорію
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>

        <TextField // добвити коли буде помилка
            className='form-control input' 
           placeholder='Пошук тут' 
          //  onChange={handleChange('search')}
            type='search'/>
{/* 
        <input type='search' className='form-control' 
        // onChange={handleChange("search")}} 
        placeholder="Пошук тут"/> */}

      </form>

    )
  }

  return (
    <div className='search-bar__container'>
      <div className='search-bar links'>

        <ul>
          <li>
            <Link to=''>Топ продаж</Link>
          </li>
          <li>
            <Link to=''>Найкращі бренди</Link>
          </li>
          <li>
            <Link to=''>Нові поступлення</Link>
          </li>
        </ul>

      </div>
      <div className='search-bar search'>
        <ul>
          <li>

            <Link to='/support'>Допомога</Link>
          </li>

        </ul>

        {searchForm()}
      </div>
    </div>
  )
}

export default SearchBar