import React, { Component } from 'react'
import axios from 'axios'





export class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            emailId : '',
            password : '',
            error : ''
                
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
            this.setState({error : err.response.data})
        })
        
         
        
    }
    
    

    render() {
       
        
        
            return (
                <div>
                    <h2 style={{textAlign:"center"}}>Login</h2>
    
                    <div style={{textAlign:"center"}}>
                        <p>{this.state.error}</p>
                        <form onSubmit={this.login}>
                            <input
                                required
                                type="email"
                                name = "emailId"
                                placeholder="Enter your Email Id"
                                value={this.state.emailId}
                                onChange= {this.handleChange}
                            />
                            <input
                                required
                                type="password"
                                name="password"
                                placeholder="Enter your Password"
                                value={this.state.password}
                                onChange= {this.handleChange}
                            />
                            <button type="submit"  > Login </button>
                        </form>
                    </div>
                </div> 
            )
        }

        
    
}

export default Login
