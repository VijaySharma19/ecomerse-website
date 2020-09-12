import React, { Component } from 'react'
import {Message} from "../alertMessage/Message.js"

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
    }
    onHide= ()=>{
        this.setState({message : '',showMessage:false})
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
        if(this.phonenumberValidate(this.state.contactNo)&&this.checkPassword()&&this.validateUsername()){
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
            })
            this.props.history.push("/")
        }
        else{
            return
        }
        
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <h1>Sign Up</h1>
                    <p>{this.state.error}</p>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Name : 
                            <input 
                                required
                                type="text"
                                name="username"
                                value={this.state.username}
                                placeholder="Enter User Name"
                                onChange={this.handleChange}
                            /><br />
                        </label>
                        <label>
                            Email Id : 
                            <input 
                                required
                                type="email"
                                name="emailId"
                                placeholder="Enter Email Id"
                                value={this.state.emailId}
                                onChange={this.handleChange}
                            /><br />
                        </label>
                        <label>
                            Contact No : 
                            <input 
                                required
                                type="text"
                                name="contactNo"
                                placeholder="Enter Contact Number"
                                value={this.state.contactNo}
                                onChange={this.handleChange}
                            /><br />
                        </label>
                        <label>
                            Password : 
                            <input 
                                required
                                type="password"
                                name="password"
                                placeholder="Enter Password"
                                value={this.state.password}
                                onChange={this.handleChange}
                            /><br />
                        </label>
                        <label>
                            Confirm Password : 
                            <input 
                                required
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm your Password"
                                value={this.state.confirmPassword}
                                onChange={this.handleChange}
                            /><br />
                        </label>
                        <button type="submit" >Register</button>
                    </form>
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
