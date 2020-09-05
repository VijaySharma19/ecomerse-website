import React, { Component } from 'react'
import axios from 'axios'
import MyCartList from "./MyCartList"

export class MyCart extends Component {

    constructor(props){
        super(props);
        this.state ={
            productList : []
        }
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
            Products =  <div className="displayFlex ProductsContainer">
                            <MyCartList productList={this.state.productList}/>
                        </div>
        }
        else{
            Products = <div>
                <h1>No Product In The Cart</h1>
            </div>
        }


        return (
            <div>
                {Products}
            </div>
        )
    }
}

export default MyCart
