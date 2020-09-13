import React, { Component } from 'react'
import {Card ,  Button} from "react-bootstrap"
import axios from "axios";

export class MyCartItem extends Component {
    constructor(props){
        super(props)
        this.removeFromCart = this.removeFromCart.bind(this)
    }

    removeFromCart = ()=>{
        this.props.updateProductList(this.props.product._id)
        
        axios.post("/users/removeFromCart",{
            userId : this.props.user.id,
            productId : this.props.product._id
        }).then(res=>{
            console.log(res)
        }).catch(err=>console.log(err.response.data))
    }

    render() {
        let title = this.props.product.title;
        let price =this.props.product.price;
        let avatar=this.props.product.avatar;
        return (
            <React.Fragment>
                <div className="column  col-12 col-sm-6 col-md-4">
                    <Card  className="card" style={{ width: '15rem' }}>
                        <Card.Img variant="top" style={{height:'12rem'}} src={require(`../../../media/${avatar}`)} />
                        <Card.Body>
                            <Card.Title>{title}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Rs. {price}</Card.Subtitle>
                            
                            <Button className="button" variant="primary" onClick={this.removeFromCart}>Remove From Cart</Button>
                        </Card.Body>
                    </Card>
                </div>
            </React.Fragment>
        )
    }
}

export default MyCartItem
