import React, {Component} from 'react';
import {Link} from "react-router-dom"
import "./Headertop.css";
class Headertop extends Component
{
    constructor(props)
    {
      super(props);
      this.state={
        user:""
      }
    }
    // Logout = ()=>{
    //   this.setState({
    //     user:""
    //   });
    //   localStorage.removeItem("User");
    // }
    
    componentDidMount()
    {
      // var User = JSON.parse(localStorage.getItem('User') ? localStorage.getItem('User'): []);
      // if(User !=="undefined" || User.length!==0)
      // {
      //   this.setState({
      //     user: User.gmail
      //   });
      // }
    }
 
    render(){
      return (
        <div className="header-bot">
              <div className="header-bot_inner_wthreeinfo_header_mid">
                {/* header-bot*/}
                <div className="col-md-4 logo_agile">
                  <h1>
                    <a href="index.html">
                      <span>G</span>rocery
                      <span>S</span>hoppy
                      <img src="images/logo2.png" alt=" " />
                    </a>
                  </h1>
                </div>
            {/* header-bot */}
            <div className="col-md-8 header">
              {/* header lists */}
              <ul>
            <li>
              <a className="play-icon popup-with-zoom-anim" href="#small-dialog1">
                <span className="fa fa-map-marker" aria-hidden="true" /> Shop Locator</a>
            </li>
            <li>
              <a href="#" data-toggle="modal" data-target="#myModal1">
                <span className="fa fa-truck" aria-hidden="true" />Track Order</a>
            </li>
            <li>
              <span className="fa fa-phone" aria-hidden="true" /> 001 234 5678
            </li>
            <li>
              <a href="#" data-toggle="modal" data-target="#myModal1">
                <span className="fa fa-unlock-alt" aria-hidden="true" /> Sign In </a>
            </li>
            <li>
              <a href="#" data-toggle="modal" data-target="#myModal2">
                <span className="fa fa-pencil-square-o" aria-hidden="true" /> Sign Up </a>
            </li>
          </ul>

              <div className="agileits_search">
                <form action="#" method="post">
                  <input name="Search" type="search" placeholder="How can we help you today?" required />
                  <button type="submit" className="btn btn-default" aria-label="Left Align">
                    <span className="fa fa-search" aria-hidden="true"> </span>
                  </button>
                </form>
              </div>
            
              <div className="top_nav_right">
                <div className="wthreecartaits wthreecartaits2 cart cart box_1">
                  <form action="#" method="post" className="last">
                    <input type="hidden" name="cmd" defaultValue="_cart" />
                    <input type="hidden" name="display" defaultValue={1} />
                    <Link className="w3view-cart cart" type="submit" name="submit" to="/Checkout" value>
                      <i className="fa fa-shopping-cart" aria-hidden="true" />
                    </Link>
                  </form>
                </div>
              </div>
            
              <div className="clearfix" />
            </div>
            <div className="clearfix" />
          </div>
        </div>
      )
   }
}

export default Headertop;