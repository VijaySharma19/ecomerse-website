import React, { Component } from 'react'
import {Link} from "react-router-dom"
import {Carousel ,Card} from 'react-bootstrap'

export class Home extends Component {
    render() {
        
        return (
            <React.Fragment>

                {/* carousal */}
                <div className="container-fluid carouselSection">
                <Carousel>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={require("../../../media/carousal1.jpg")}
                        alt="First slide"
                        />
                        
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={require("../../../media/carousal2.jpg")}
                        alt="Third slide"
                        />

                       
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={require("../../../media/carousal3.jpg")}
                        alt="Third slide"
                        />

                        
                    </Carousel.Item>
                    </Carousel>
                </div>

                {/* Products Buy and Return details showCase */}
                <div className="container-fluid detailsShowCase">
                    <div className="row">
                        
                        <div className="col-12 col-lg-4">
                            <Card style={{ width: '100%', backgroundColor : "#393e46",color: "#eeeeee" }}>
                                <Card.Body>
                                    <Card.Title><span>1. </span> Safe Payments</Card.Title>
                                    
                                    <Card.Text>
                                        There is a safe payment gateway which can help you to make easy and secure payments. 
                                        Product should to be added to the cart to purchase that item.  

                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="col-12 col-lg-4">
                            <Card style={{ width: '100%', backgroundColor : "#393e46",color: "#eeeeee" }}>
                                <Card.Body>
                                    <Card.Title><span>2. </span> Genuine Products</Card.Title>
                                    
                                    <Card.Text>
                                        All of the products purchased through this site are genuine 
                                        and certified. These products are sold by certified seller and have best price in the market.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="col-12 col-lg-4">
                            <Card style={{ width: '100%', backgroundColor : "#393e46",color: "#eeeeee" }}>
                                <Card.Body>
                                    <Card.Title><span>3. </span>Easy Return Policy</Card.Title>
                                    
                                    <Card.Text>
                                        All of the products purchased from this site can be returned 
                                        within 10 days of delivery if the products comes out to be defective 
                                        or doesn't match user's requirements.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>

                {/* exercises */}

                <div className="container-fluid exerciseShowCase">
                    <div className="row">
                        <div className="col-12 col-md-4">
                            <img src={require("../../../media/cardio.jpg")}  alt="Cardio" />
                            <div className=" text">
                                <div className="container align-middle">
                                    <h2 className=" heading">Fat Loss</h2>
                                    <p>
                                        Losing Fat Is HARD <br/>
                                        Being Fat Is HARD <br/>
                                        Choose Your HARD.
                                    </p>
                                    <Link to="/products" className="btn">Explore All Products</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <img src={require("../../../media/weight.jpg")} alt="weight" />
                            <div className=" text">
                                <div className="container align-middle">
                                    <h2 className=" heading">Weight Training</h2>
                                    <p>
                                        Wake Up Beauty,<br /> It's Time To Beast !<br />Monsters Do Exist !
                                    </p>
                                    <Link to="/products" className="btn">Explore All Products</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-4 ">
                            <img src={require("../../../media/kickboxing.jpg")} alt="kickboxing" />
                            <div className=" text">
                                <div className="container align-middle">
                                    <h2 className=" heading">Kick Boxing</h2>
                                    <p>
                                        It's not just self defence, it's about self control, body discipline and mind discipline . 
                                    </p>
                                    <Link to="/products" className="btn">Explore All Products</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                   
                </div>

            </React.Fragment>
        )
    }
}

export default Home
