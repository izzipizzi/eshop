import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';


import Typography from '@material-ui/core/Typography';


import {API} from '../../config'
import ProductCardButtons from './ProductCardButtons';
const useStyles = makeStyles({
  root: {
    maxWidth: 320,
    minWidth: 320,
    margin: '20px 30px',
    // minHeight: 500
    backgroundColor: '#fafcff'
  },
  media: {
    height: 250,
    pading: 10
  },
  bttns_container :{
    display:'flex',
    justifyContent: 'center',
    marginBottom:'5px',
    flexGrow : 1
    
  },
  card:{
      minWidth: 425
  },
  description:{
      wordWrap: true,
      paddingRight: 95
  }
});
const ProductCard = ({product}) => {

  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.card}>
        <CardMedia
          component="img"
          className={classes.media}
          image={`${API}/products/photo/${product._id}`}
          title={product.name}
          alt ={product.name}/>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {product.name}
          </Typography>
          <Typography gutterBottom variant="h4" component="h4">
            {product.price+' ₴'}
          </Typography>
          <Typography className={classes.description} variant="body2" color="textSecondary" component="p">
            {product.description.length < 100
              ? product.description
              : product
                .description
                .substr(0, 100) + "...."}
          </Typography>
        </CardContent>
      </CardActionArea>

     <ProductCardButtons/>
    </Card>
  )
}

export default ProductCard