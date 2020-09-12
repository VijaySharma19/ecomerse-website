import React from 'react'
import { FaFacebookSquare,FaInstagramSquare,FaGithub } from "react-icons/fa"
import { MdEmail } from "react-icons/md"


export default function Footer() {
    return (
        <div className="footer container-fluid">

            <h3>Connect With Me</h3>
            <div className="container-fluid">
                <div className="row">
                    <div className="item col-12 col-sm-6  ">
                        <a href="mailto:vijay29042002@gmail.com"><MdEmail className="icon"></MdEmail>  vijay29042002@gmail.com</a>
                    </div>
                    <div className="item col-12 col-sm-6">  
                        <a href="https://github.com/VijaySharma19"><FaGithub className="icon"></FaGithub>  github.com/VijaySharma19</a>
                    </div>
                    <div className="item col-12 col-sm-6">   
                        <a href="https://www.facebook.com/profile.php?id=100007510008827"  ><FaFacebookSquare className="icon"></FaFacebookSquare>  Vijay Sharma</a>
                    </div>
                    <div className="item col-12 col-sm-6">
                        <a href="https://www.instagram.com/sharma_vijay1999/" ><FaInstagramSquare className="icon"></FaInstagramSquare>  sharma_vijay1999</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
