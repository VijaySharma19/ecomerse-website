import React, { Component } from 'react'
import axios from 'axios'
import MyCartList from "./MyCartList"

export class MyCart extends Component {

    constructor(props){
        super(props);
        this.state ={
            productList : []
        }
        this.updateProductList = this.updateProductList.bind(this)
    }
    updateProductList=(productId)=>{
        let updatedList = this.state.productList; 
        updatedList=updatedList.filter(product=>product._id !== productId)
        this.setState({productList : updatedList})
    }

    componentDidMount(){
        axios.post('/users/showCartItems',{
            userId : this.props.user.id
        }).then(res=>{
            this.setState({productList : res.data})
        }).catch(err=>console.log(err))
        // console.log(this.props.user.id)
    }

    render() {
        let Products ;
       
        if(this.state.productList.length>0){
            Products =  <div className="container-fluid productsContainer">
                            <h1 className="heading">My Cart</h1>
                            <div className="row">
                                <MyCartList 
                                    user={this.props.user} 
                                    productList={this.state.productList}
                                    updateProductList={this.updateProductList}
                                />
                            </div>
                        </div>
        }
        else{
            Products = <div style={{textAlign:"center" , margin:"2rem"}}>
                <h1>No Product In The Cart</h1>
            </div>
        }


        return (
            <div className="Products">
                {Products}
            </div>
        )
    }
}

export default MyCart
