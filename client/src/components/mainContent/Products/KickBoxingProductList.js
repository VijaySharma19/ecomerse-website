import React, { Component } from 'react'
import ProductItem from './productItem'

export class KickBoxingProductList extends Component {
    render() {
        return (this.props.productList.map((product)=>{
            if(product.category==="Kickboxing"){
                return <ProductItem
                    key={product._id}
                    product = {product}
                    user={this.props.user}
                />
            }
            else{
                return <React.Fragment key={product._id}></React.Fragment>
            }
        }))
    }
}

export default KickBoxingProductList
