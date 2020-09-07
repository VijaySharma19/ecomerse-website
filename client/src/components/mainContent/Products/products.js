import React, { Component } from 'react'

import CardioProductList from './CardioProductList'
import WeightProductList from './WeightProductList'
import KickBoxingProductList from './KickBoxingProductList'

import axios from 'axios'
import './css/products.css'

export class Products extends Component {

    constructor(props){
        super(props);
        this.state ={
            productList : []
        }
    }

    componentDidMount(){
        axios.get('/products').then(res=>{
            this.setState({productList : res.data})
            // console.log(res.data)
        }).catch(err=>{
            console.log(err)
        })
    }

    render() {
        return (
            <div className="Products ">
                <div className="container-fluid productsContainer">
                    <h1 className="heading">Cardio Products</h1>
                    <div className="row">
                        <CardioProductList productList={this.state.productList}/>
                    </div>
                </div>
                <div className="container-fluid productsContainer weightProducts">
                    <h1 className="heading">Weight Lifting Products</h1>
                    <div className="row">
                        <WeightProductList productList={this.state.productList}/>
                    </div>
                </div>
                <div className="container-fluid productsContainer">
                    <h1 className="heading">Kick Boxing Products</h1>
                    <div className="row">
                        <KickBoxingProductList productList={this.state.productList}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Products
