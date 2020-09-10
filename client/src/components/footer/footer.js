import React from 'react'



export default function Footer() {
    return (
        <div className="footer container-fluid">
           
            <h3>Connect With Me</h3>
            <div className="container-fluid">
                <div className="row">
                    <div className="item col-6 col-lg-3  ">
                        <h5>Email ID</h5><br />
                        <a href="mailto:vijay29042002@gmail.com">vijay29042002@gmail.com</a>
                    </div>
                    <div className="item col-6 col-lg-3">
                        <h5>Contact No</h5><br />
                        <a href="tel:+918708874798">8708874798</a>
                    </div>
                    <div className="item col-6 col-lg-3">
                        <h5>FaceBook</h5><br />
                        <a href="https://www.facebook.com/profile.php?id=100007510008827"  >Vijay Sharma</a>
                    </div>
                    <div className="item col-6 col-lg-3">
                        <h5>Instagram</h5><br />
                        <a href="https://www.instagram.com/sharma_vijay1999/" >sharma_vijay1999</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
