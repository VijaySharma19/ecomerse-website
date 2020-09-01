import React, { Component } from 'react'
import axios from 'axios'

export class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            emailId : '',
            password : ''    
        }
        this.handleChange = this.handleChange.bind(this);
        
        this.login = this.login.bind(this)
    }

    handleChange=(e)=>{
        const target = e.target;
        const value=  target.value;
        const name = target.name
        this.setState( { [name] : value })
    }
    
    login=(e)=>{
        axios.post('/users/login',{
            emailId : this.state.emailId,
            password: this.state.password
        }).then(res=>{
            const id = res.data.id;
            const username = res.data.username;
            const emailId = res.data.emailId;
            const contactNo = res.data.contactNo;
            const products = res.data.products;
            const avatar = res.data.avatar;
            this.props.addUser(id,username,emailId,contactNo,products,avatar)
            
        }).catch(err=>console.log(err))
        e.preventDefault()
    }

    render() {
        return (
            <div>
                <h2 style={{textAlign:"center"}}>Login</h2>

                <div style={{textAlign:"center"}}>
                    <form >
                        <input
                            type="text"
                            name = "emailId"
                            placeholder="Enter your Email Id"
                            value={this.state.emailId}
                            onChange= {this.handleChange}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your Password"
                            value={this.state.password}
                            onChange= {this.handleChange}
                        />
                        <button onClick={this.login} > Login </button>
                    </form>
                </div>
            </div> 
        )
    }
}

export default Login
