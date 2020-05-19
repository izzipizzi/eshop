import React from 'react'

import {makeStyles} from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CardActions from '@material-ui/core/CardActions';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCartSharp';


const useStyles = makeStyles({
    
    bttns_container :{
      display:'flex',
      justifyContent: 'center',
      marginBottom:'5px',
      flexGrow : 1
      
    }
  });
  
const ProductCardButtons = ()=>{
    const classes = useStyles();


    return(
        <CardActions className={classes.bttns_container}>
        
        <Button size="small" color="primary">
          Переглянути
        </Button>

        <IconButton color="primary" aria-label="add to shopping cart">
          <AddShoppingCartIcon/>
        </IconButton>
      </CardActions>
    )
}

export default ProductCardButtons