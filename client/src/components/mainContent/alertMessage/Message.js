import React, { Component } from 'react'
import {Modal,Button} from "react-bootstrap"
export class Message extends Component {
    
    render() {
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                
                >
                <Modal.Header style={{backgroundColor:"#222831",color:"#eeeeee"}} closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" style={{marginLeft:"2rem"}}>
                    Alert!
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body  
                    style={{ 
                        backgroundColor:"#eeeeee",
                        color:"#393e46",
                        display:"flex",
                        justifyContent:"center",
                        textAlign:"center"
                        }}
                >
                    <div  style={{width:"18rem"}}>
                        <h4 style={{display:"inline-block"}}>
                            {this.props.message}
                        </h4>
                        <Button  
                            onClick={this.props.onHide} 
                            style={{backgroundColor:"#00adb5",color:"#eeeeee",width:"100%"}}
                        >
                            Okay!
                        </Button>
                    </div>
                    
                </Modal.Body>
                {/* <Modal.Footer style={{backgroundColor:"#eeeeee",color:"#393e46"}}>
                    
                </Modal.Footer> */}
            </Modal>
        )
    }
}

export default Message
