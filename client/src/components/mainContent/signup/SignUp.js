import React, { Component } from 'react'
import {Message} from "../alertMessage/Message.js"
import { Link } from "react-router-dom"
import "./css/signup.css"

import axios from 'axios';

export class SignUp extends Component {

    constructor(props){
        super(props);
        this.state={
            id : '',
            username : '',
            emailId : '',
            contactNo : '',
            products : '',
            avatar : '',
            password : '',
            confirmPassword : '',
            message: '',
            showMessage : false
        }
        this.handleChange= this.handleChange.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
        this.phonenumberValidate=this.phonenumberValidate.bind(this)
        this.onHide =this.onHide.bind(this)
        this.checkPassword = this.checkPassword.bind(this)
        this.validateUsername =this.validateUsername.bind(this)
        this.validatePassword = this.validatePassword.bind(this)
    }
    onHide= ()=>{
        this.setState({message : '',showMessage:false})
    }

    validatePassword=()=> 
    { 
        let inputtxt =this.state.password;
        var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        if(passw.test(inputtxt)) 
        { 
            return true;
        }
        else
        {
            this.setState({
                password: '',
                confirmPassword : '',
                message: ' Password should be between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter',
                showMessage:true
            }) 
            
            return false;
        }
    }

    validateUsername = ()=>{
        let regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
        if(!regName.test(this.state.username)){
            this.setState({
                username : '',
                password : '',
                confirmPassword : '',
                message: "Username can only contain a-z or A-Z characters",
                showMessage : true
            })
            return false;
        }
        else{
            return true;
        }

    }

    checkPassword = ()=>{
        if(this.state.password===this.state.confirmPassword){
            return true;
        }
        else{
            this.setState({
                password : '',
                confirmPassword : '',
                message: "Please make sure that your password and confirm password have same value",
                showMessage : true
            })
            return false;
        }
    }
    
    phonenumberValidate(inputtxt)
    {
        let phoneno = /^\d{10}$/;
        if((inputtxt.match(phoneno)))
        {
            return true;
        }
        else
        {
            this.setState({
                contactNo: "",
                password : '',
                confirmPassword : '',
                message: "Please enter 10 digit contact number",
                showMessage : true
            })
            return false;
        }
    }
    handleChange=(e)=>{
        const target = e.target;
        const value=  target.value;
        const name = target.name
        this.setState( { [name] : value })
    }
    handleSubmit=(e)=>{
        e.preventDefault()
        if(this.phonenumberValidate(this.state.contactNo)&&this.checkPassword()&&this.validatePassword()){
            axios.post('/users/signup',{
                username: this.state.username,
                emailId : this.state.emailId,
                contact: this.state.contactNo,
                password: this.state.password
            }).then(res=>{
                const id = res.data.id;
                const username = res.data.username;
                const emailId = res.data.emailId;
                const contactNo = res.data.contactNo;
                const products = res.data.products;
                const avatar = res.data.avatar;

                //set state.user
                this.props.addUser(id,username,emailId,contactNo,products,avatar)
                this.props.history.push("/")
            }).catch(err=>{
                this.setState({
                    username: '',
                    contactNo: "",
                    password : '',
                    confirmPassword : '',
                    message: err.response.data,
                    showMessage : true
                })
                
            })
            
        }
        else{
            return
        }
        
    }

    render() {
        return (
            <React.Fragment>
                <div className="container-fluid signup-page" >
                    <div className= "row pt-5 pb-5  ">
                        <div className="col-lg-5 col-md-7 col-sm-9 col-12 mx-auto">
                            <div className="signup-wrapper card card-body">
                                <h1 className="heading">Register</h1>
                                
                                <form className="form" onSubmit={this.handleSubmit}>
                                    <div className="item form-group">
                                        <label>Name</label>
                                        <input
                                            required
                                            className="form-control"
                                            type="text"
                                            name="username"
                                            value={this.state.username}
                                            placeholder="Enter User Name"
                                            onChange={this.handleChange}
                                        ></input>
                                    </div>
                                    <div className="item form-group">
                                        <label>Email Id</label>
                                        <input
                                            required
                                            className="form-control"
                                            type="email"
                                            name="emailId"
                                            placeholder="Enter Email Id"
                                            value={this.state.emailId}
                                            onChange={this.handleChange}
                                        ></input>
                                    </div>
                                    <div className="item form-group">
                                        <label>Contact No</label>
                                        <input
                                             required
                                             className="form-control"
                                             type="text"
                                             name="contactNo"
                                             placeholder="Enter Contact Number"
                                             value={this.state.contactNo}
                                             onChange={this.handleChange}
                                        ></input>
                                    </div>
                                    <div className="item form-group">
                                        <label>Password</label>
                                        <input
                                            required
                                            className="form-control"
                                            type="password"
                                            name="password"
                                            placeholder="Enter Password"
                                            value={this.state.password}
                                            onChange={this.handleChange}
                                        ></input>
                                    </div>
                                    <div className="item form-group">
                                        <label>Confirm Password</label>
                                        <input
                                             required
                                             className="form-control"
                                             type="password"
                                             name="confirmPassword"
                                             placeholder="Confirm your Password"
                                             value={this.state.confirmPassword}
                                             onChange={this.handleChange}
                                        ></input>
                                    </div>
                                    <button  className="item btn btn-block" type="submit" >Register</button>
                                    <span className="item">----or----</span>
                                    <Link  className="item btn btn-block" to="/users/login" style={{marginBottom:"1rem"}}>Already have a Account ? </Link>
                                </form>
                            </div>
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

export default SignUp
