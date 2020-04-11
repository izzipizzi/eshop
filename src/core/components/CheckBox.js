import React, { useState } from 'react'

const CheckBox = ({categories,handleFilters}) => {
    const[checked,setChecked] = useState([])
// перечключення чекбокса
    const handleToggle = category =>()=>{
        // поветрає перший індекс чекнутої категорії або повертє -1 якщо нічого не вибрано
        const currentCategoryId = checked.indexOf(category)

        const newCheckedCategoryId =[...checked]
        // якщо вибрана категорія не є в стейті то добавляє якщо є то забирає
        if (currentCategoryId===-1) {
            newCheckedCategoryId.push(category)
            
        }
        else{
            newCheckedCategoryId.splice(currentCategoryId,1)

        }
        // console.log(newCheckedCategoryId)
        setChecked(newCheckedCategoryId)
        handleFilters(newCheckedCategoryId)
    }

  return (categories.map((category, index) => (
    <li className='list-unstyled' key={index}>
      <input onChange={handleToggle(category._id)} value={checked.indexOf(category._id===-1)} type='checkbox' className='form-check-input'/>
      <label className='form-check-label'>{category.name}</label>
    </li>
  )))
}

export default CheckBox