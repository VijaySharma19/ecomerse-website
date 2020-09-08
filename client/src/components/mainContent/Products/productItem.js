import React, { Component  } from 'react'
import {Card ,  Button} from "react-bootstrap"
import Message from '../alertMessage/Message'

import axios from "axios";

export class ProductItem extends Component {

    constructor(props){
        super(props);
        this.state={
            message : "",
            showMessage : false
        }
        this.addToCart = this.addToCart.bind(this)
        this.onHide = this.onHide.bind(this)
    }


    addToCart=()=>{
        if(this.props.user.isLoggedIn){
            axios.post("/users/addToCart",{
                userId: this.props.user.id,
                productId : this.props.product._id
            }).then(res=>{
                this.setState({message:res.data,showMessage:true})
            }).catch(err=>{
                this.setState({message:err.response.data,showMessage:true})
            })
        }
        else{
            this.setState({message:"Please Login First",showMessage:true})
        }
    }
    onHide=()=>{
        this.setState({message:"",showMessage:false})
    }

    render() {
        let title = this.props.product.title;
        let price =this.props.product.price;
        let avatar=this.props.product.avatar;
        
        
        // let category=this.props.product.category;
        
        return (
            <React.Fragment>
                <div className="column  col-12 col-sm-6 col-md-4">
                    <Card  className="card" style={{ width: '15rem' }}>
                        <Card.Img variant="top" style={{height:'12rem'}} src={require(`../../../media/${avatar}`)} />
                        <Card.Body>
                            <Card.Title>{title}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Rs. {price}</Card.Subtitle>
                            
                            <Button className="button" variant="primary" onClick={this.addToCart}>Add To Cart</Button>
                        </Card.Body>
                    </Card>
                </div>
                <Message
                    show={this.state.showMessage}
                    onHide={this.onHide}
                    message={this.state.message}
                ></Message>
            </React.Fragment>
            
        )
    }
}

export default ProductItem
