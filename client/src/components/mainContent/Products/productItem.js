import React, { Component } from 'react'
import {Card ,  Button} from "react-bootstrap"

export class ProductItem extends Component {
    render() {
        let title = this.props.product.title;
        let price =this.props.product.price;
        let avatar=this.props.product.avatar;
        
        
        // let category=this.props.product.category;
        
        return (
            <div className="column  col-12 col-sm-6 col-md-4">
                <Card  className="card" style={{ width: '15rem' }}>
                    <Card.Img variant="top" style={{height:'12rem'}} src={require(`../../../media/${avatar}`)} />
                    <Card.Body>
                        <Card.Title>{title}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Rs. {price}</Card.Subtitle>
                        
                        <Button className="button" variant="primary">Add To Cart</Button>
                    </Card.Body>
                </Card>
            </div>
            
        )
    }
}

export default ProductItem
