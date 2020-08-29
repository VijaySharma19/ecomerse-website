import React, { Component } from 'react'
import ProductList from './ProductList'
import '../../../App.css'

export class Products extends Component {

    state ={
        productList : [
            {
                id : 1,
                title : 'Product 1',
                price : '20000',
                description : 'this is an awesome product',
                img : 'https://cdn.pixabay.com/photo/2017/09/28/18/13/bread-2796393_960_720.jpg'
            },
            {
                id : 2,
                title : 'Product 2',
                price : '10000',
                description : 'this is an awesome product',
                img : 'https://cdn.pixabay.com/photo/2017/09/28/18/13/bread-2796393_960_720.jpg'
            },
            {
                id : 3,
                title : 'Product 3',
                price : '30000',
                description : 'this is an awesome product',
                img : 'https://cdn.pixabay.com/photo/2017/09/28/18/13/bread-2796393_960_720.jpg'
            },

        ]
    }

    render() {
        return (
            <div className="displayFlex ProductsContainer">
                <ProductList productList={this.state.productList}/>
            </div>
        )
    }
}

export default Products
