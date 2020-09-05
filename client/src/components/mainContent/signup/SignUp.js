import React, { Component } from 'react'
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
            error: ''
        }
        this.handleChange= this.handleChange.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
        this.phonenumberValidate=this.phonenumberValidate.bind(this)
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
            alert("Please enter 10 digit contact number");
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
        if(this.phonenumberValidate(this.state.contactNo)){
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
                    <button type="submit" >Register</button>
                </form>
            </div>
        )
    }
}

export default SignUp
