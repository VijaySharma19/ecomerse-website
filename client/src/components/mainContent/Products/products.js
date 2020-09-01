import React, { Component } from 'react'
import ProductList from './ProductList'
import axios from 'axios'
import '../../../App.css'

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
        }).catch(err=>{
            console.log(err)
        })
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
