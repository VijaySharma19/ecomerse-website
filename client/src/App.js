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

export class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Header></Header>
          <Route exact path='/' component={Home}></Route>
          <Route path='/products' component={Product}></Route>
          <Route path='/users/showCartItems' component={MyCart}></Route>
          <Route path='/users/login' component={Login}></Route>
          <Route path='/users/signup' component={SignUp}></Route>
        </Router>
      </div>
    )
  }
}

export default App
