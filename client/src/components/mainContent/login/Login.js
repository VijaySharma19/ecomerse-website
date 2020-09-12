import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Message } from "../alertMessage/Message.js"

import { FaUserCircle,FaLock } from "react-icons/fa"

import axios from 'axios'

import "./css/login.css"




export class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            emailId : '',
            password : '',
            message : '',
            showMessage : false
                
        }
        this.handleChange = this.handleChange.bind(this);
        
        this.login = this.login.bind(this) 

        this.onHide = this.onHide.bind(this)
    }

    onHide=(e)=>{
        this.setState({message : "", showMessage:false,email:'',password:''})
    }

    handleChange=(e)=>{
        const target = e.target;
        const value=  target.value;
        const name = target.name
        this.setState( { [name] : value })
    }

    login=(e)=>{
        e.preventDefault()
        axios.post('/users/login',{
            emailId : this.state.emailId,
            password: this.state.password
        }).then(res=>{
            if(res.data.Error){
                console.log(res.data.Error)
            }
            else{
                const id = res.data.id;
                const username = res.data.username;
                const emailId = res.data.emailId;
                const contactNo = res.data.contactNo;
                const products = res.data.products;
                const avatar = res.data.avatar;

                //set state.user
                this.props.addUser(id,username,emailId,contactNo,products,avatar)
                this.props.history.push("/")
                }

        }).catch(err=>{
            this.setState({message : err.response.data,showMessage : true})
        })
        
         
        
    }
    
    

    render() {
       
        
        
            return (
                <React.Fragment>
                    <div className="login-page container-fluid">
                        <div className="login-wrapper">
                                        <h2 className="heading">Welcome Back !</h2>
                        
                                        <div style={{display:"inline-block" ,width:"100%"}} >
                                            <form className="form" onSubmit={this.login}>
                                                <label className="item" for="emailId"><FaUserCircle className="icon"></FaUserCircle>
                                                    <input 
                                                        type="email"
                                                        required
                                                        name = "emailId"
                                                        id="emailId"
                                                        placeholder="Enter your Email Id"
                                                        value={this.state.emailId}
                                                        onChange= {this.handleChange}
                                                        
                                                    />
                                                </label>
                                                <label className="item"  for="password"><FaLock className="icon"></FaLock>
                                                    <input
                                                        required
                                                        id="password"
                                                        type="password"
                                                        name="password"
                                                        placeholder="Enter your Password"
                                                        value={this.state.password}
                                                        onChange= {this.handleChange}
                                                        
                                                    />
                                                </label>
                                                <button className="item btn" type="submit"  > Login </button>
                                                <span className="item" style={{textAlign:"center"}}>-----or-----</span>
                                                <Link className="item btn"  to="/users/signup" >Create New Account</Link>
                                            </form>
                                        </div>
                            </div>
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

export default Login
