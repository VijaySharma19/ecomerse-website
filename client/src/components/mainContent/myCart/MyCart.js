import React, { Component } from 'react'
import axios from 'axios'
import MyCartList from "./MyCartList"
import  "./css/myCart.css"

export class MyCart extends Component {

    constructor(props){
        super(props);
        this.state ={
            productList : [],
            totalAmount : 0
        }
        this.updateProductList = this.updateProductList.bind(this)
        this.calcAmount = this.calcAmount.bind(this)
        // this.decreaseAmount = this.decreaseAmount.bind(this)
    }

    calcAmount= ()=>{
        let finalAmount = 0;
        this.state.productList.forEach(product=>{
            finalAmount = finalAmount + parseInt(product.price)
        })
        this.setState({totalAmount: finalAmount})
    }
    // decreaseAmount= (productPrice)=>{
    //     let finalAmount = this.state.totalAmount - parseInt(productPrice);
    //     this.setState({totalAmount : finalAmount})
    // }

     updateProductList=async (productId)=>{
        let updatedList = this.state.productList; 
        updatedList=updatedList.filter(product=>product._id !== productId)
        await this.setState({productList : updatedList})
        await this.calcAmount()
    }

    componentDidMount(){
        if(this.props.user.isLoggedIn){
            axios.post('/users/showCartItems',{
                userId : this.props.user.id
            }).then(res=>{
                this.setState({productList : res.data})
                this.calcAmount()
            }).catch(err=>console.log(err))
            // console.log(this.props.user.id)
        }
        else{
            this.props.history.push("/")
        }
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
            <div className="myCart-page">
                <div className="showcase row container-fluid ">
                    <div className="col-12 col-sm-6 showcase-wrapper mx-auto">
                        <img className="item img" src={require("./img/avatar.png")} alt="avatar" />
                        <h2 className="item">Hello! {this.props.user.username} </h2>
                        <h5 className="item">{this.props.user.emailId}</h5>
                        <h5 className="item">{this.props.user.contactNo}</h5>
                    </div>
                    <div className="col-12 amount-wrapper">
                        <h2 className="item">Total Amount = Rs. {this.state.totalAmount}</h2>
                    </div>
                </div>
                <div className="Products">
                    {Products}
                </div>
            </div>
        )
    }
}

export default MyCart
