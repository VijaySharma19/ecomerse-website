import React, { Component } from 'react'
import ProductItem from './productItem'

export class ProductList extends Component {
    render() {
        return (this.props.productList.map((product)=>{
            return <ProductItem
                key={product._id}
                product = {product}
            />
        }))
    }
}

export default ProductList
