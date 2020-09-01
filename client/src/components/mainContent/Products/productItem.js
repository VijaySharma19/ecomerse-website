import React, { Component } from 'react'

export class ProductItem extends Component {
    render() {
        return (
            <div className="card" style={{width: "18rem"}}>
                <img src={this.props.product.img} className="card-img-top" alt="avatar"/>
                <div className="card-body">
                    <h5 className="card-title">{this.props.product.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Rs. {this.props.product.price}</h6>
                    <p className="card-text">{this.props.product.description}</p>
                    <button className="btn btn-primary">Add To Cart</button>
                </div>
            </div>
            
        )
    }
}

export default ProductItem
