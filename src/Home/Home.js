import React, {useEffect} from "react";
import product from "../reducers/product";
import ProductCard from "../components/ProductCard/ProductCard";
import Container from "../Container";
import css from './Home.module.css'

const Home = ({products,loadProducts}) => {

    // debugger
    useEffect(()=>{
        //включити коли появиться інтернет
        loadProducts('createdAt',9)

    },[])
    let loadProductCards = products.productsList.map(product=>(<ProductCard key ={product._id} product={product}/>))
    return (
        <Container className={css.Home}>

            <div className='container'>
                <div className="content-header">
                    <h2>Останні поступлення</h2>
                </div>
                <div className='card-holder'>
                    {products.isLoading ? (<p>Loading....</p>):
                        (products.isError ? (<p>{products.errorMsg}</p>): loadProductCards)
                    }
                </div>
            </div>


        </Container>
    )
}
export default Home