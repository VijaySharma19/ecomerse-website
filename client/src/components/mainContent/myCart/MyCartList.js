import React, { Component } from 'react'
import MyCartItem from "./MyCartItem"
export class MyCartList extends Component {
    render() {

            return (this.props.productList.map((product)=>{
                return <MyCartItem
                    key={product._id}
                    product = {product}
                    user={this.props.user}
                    updateProductList={this.props.updateProductList}
                />
            }))
    }
}

export default MyCartList
