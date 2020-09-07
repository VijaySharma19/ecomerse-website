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
                <div className="col-3 col-md-2 col-lg-1">
                    <Link className="navLink btn" to='/users/showCartItems'>MyCart</Link>
                </div>
                <div className="col-3 col-md-2 col-lg-1">
                    <button className="navLink btn " onClick = {this.logout}>Logout</button>
                </div>
            </React.Fragment>   
        }
        else{
            LoggedInDependent = <React.Fragment>
                <div className="col-3 col-md-2 col-lg-1">
                    <Link className="navLink btn " to='/users/login'>Login</Link>
                </div>
                <div className="col-3 col-md-2 col-lg-1">
                    <Link className="navLink btn" to='/users/signup'>SignUp</Link>
                </div>
            </React.Fragment>
        }

        

        return (
            <React.Fragment>
                
                <nav className="navBar container-fluid">
                    <div className="row">
                        <div className="col-12 col-md-4 col-lg-8"><h2 className="navLogo">beAstModeON</h2></div>
                        <div className="col-3 col-md-2 col-lg-1"><Link className="navLink btn" to='/'>Home </Link></div>
                        <div className="col-3 col-md-2 col-lg-1"><Link className="navLink btn" to='/products'>Products </Link></div>
                        {LoggedInDependent}
                    </div>
                </nav>

            </React.Fragment>
        )
    }
}

export default Header
