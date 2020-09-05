import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class Header extends Component {

    constructor(props){
        super(props)
        this.logout = this.logout.bind(this)
    }
    logout(e){
        e.preventDefault()
        this.props.removeUser()
        this.props.history.push("/")
    }


    render() {
       
        // show  either myCart or login,signup
        let LoggedInDependent;
        if(this.props.user.isLoggedIn){
            LoggedInDependent = <React.Fragment>
                <li className="nav-item">
                    <Link className="nav-link" to='/users/showCartItems'>My Cart</Link>
                </li>
            </React.Fragment>   
        }
        else{
            LoggedInDependent = <React.Fragment>
                <li className="nav-item">
                    <Link className="nav-link" to='/users/login'>Login</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to='/users/signup'>Sign Up</Link>
                </li>
            </React.Fragment>
        }

        //if logged in then show username and logout button

        

        let showUserName;
        if(this.props.user.isLoggedIn){
            showUserName=<React.Fragment  >
                            
                                <span className=" mr-sm-2" >Hello! {this.props.user.username} </span>
                                <button className="btn btn-outline-success my-2 my-sm-0" onClick = {this.logout}>Logout</button>
                                
                        </React.Fragment>
        }

        return (
            <React.Fragment>
                
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link className="navbar-brand" to='/'>Ecomerse Website</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <Link className="nav-link" to='/'>Home </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/products'>Products</Link>
                            </li>
                            {LoggedInDependent}
                            <div className=" float-sm-right">
                                {showUserName}
                            </div>
                        </ul>
                        
                    </div>
                    
                </nav>
            </React.Fragment>
        )
    }
}

export default Header
