import React, { Component } from 'react';
import {BrowserRouter as Router , Route} from 'react-router-dom'
import './App.css'

// Components import
import Header from './components/header/header'
import Home from './components/mainContent/home/Home'
import Product from './components/mainContent/Products/products'
import MyCart from './components/mainContent/myCart/MyCart'
import Login from './components/mainContent/login/Login'
import SignUp from './components/mainContent/signup/SignUp'
import axios from 'axios';

export class App extends Component {
  
    constructor(props){
      super(props);
      this.state ={
        user : {}
      };
      this.addUser= this.addUser.bind(this)
      this.removeUser =this.removeUser.bind(this)
    }
  
  componentDidMount(){
    axios.get('/users').then(res=>{
      if(res.data.error){
        console.log(res.data.error)
      }
      else{
        this.setState({user : {
          id : res.data.id,
          username : res.data.username,
          emailId : res.data.emailId,
          contactNo : res.data.contactNo,
          products : res.data.products,
          avatar : res.data.avatar,
          isLoggedIn : true
    
        }})
      }
    }).catch(err=>console.log(err.response.data))
  }

  addUser(id,username,emailId,contactNo,products,avatar){

    this.setState({user : {
      id : id,
      username : username,
      emailId : emailId,
      contactNo : contactNo,
      products : products,
      avatar : avatar,
      isLoggedIn : true

    }})

  }
  
  removeUser(){
    this.setState({user : {}})
    axios.get('/users/logout').then(res=>{
      console.log(res.data)
    })
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Header 
            user = {this.state.user} 
            addUser={this.addUser}
            removeUser= {this.removeUser}
          ></Header>
          <Route exact path='/' component={Home}></Route>
          <Route path='/products' component={Product}></Route>
          <Route 
            path='/users/showCartItems' 
            component={()=><MyCart user={this.state.user}></MyCart>}
          ></Route>
          <Route 
            path='/users/login' 
            component={()=><Login 
                                user={this.state.user} 
                                addUser={this.addUser}
                            ></Login>}>
          </Route>
          <Route 
            path='/users/signup' 
            component={()=><SignUp 
                              user={this.state.user} 
                              addUser={this.addUser}
                            ></SignUp>}
          ></Route>
          
 
        </Router>
      </div>
    )
  }
}

export default App
