import React from 'react';

import Image from '../Image'

const style = {
  card: {
    maxWidth: 425,
    height: 600,
    display: ' flex',
    flexDirection: 'column'
  },
  cardRoot: {
    maxWidth: 320,
    minWidth: 320,
    margin: '20px 30px',
    display: ' flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fafcff'
  }
}
const ProductCard = ({product}) => {
  return (
    <div style={style.cardRoot}>

      <div style={style.card}>

        <Image product={product}/>
        <span>{product.name}</span>
        <span>
          <b>Категорія</b>
          :{product.category.name}</span>
        <span>
          <b>Виробник</b>
          :{product.manufacturer.name}</span>
        <span>
          <b>Опис</b>
          :{product.description.length < 100
            ? product.description
            : product
              .description
              .substr(0, 100) + "...."}</span>
        <span>
          Ціна :{product.price}</span>

      </div>
    </div>

  )
}

export default ProductCard