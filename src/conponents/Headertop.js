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
    componentDidMount()
    {
      console.log(this.props.Gmail);
      this.setState({
        user: this.props.Gmail
      });
    }
    RedirectLogin=()=>{
    // window.location.replace('http://localhost:4000/Login');
    this.props.OpenLogin(1);
    }
    RedirectSignup=()=>{
      //window.location.replace('http://localhost:4000/Signup');
      this.props.OpenLogin(2);
    }
    Logout =()=>{
      this.setState({
        user:"",
      });
      this.props.OpenLogin(0);
    }
    ShowInfo = user=>{
     
      if(user!="" || user)
      {
        return (
          <ul>
          <li>
            <a className="play-icon popup-with-zoom-anim" >
              <span className="fa fa-map-marker" aria-hidden="true" /> Shop Locator</a>
          </li>
          <li>
            <a  data-toggle="modal" data-target="#myModal1">
              <span className="fa fa-truck" aria-hidden="true" />Track Order</a>
          </li>
          <li>
            <span className="fa fa-phone" aria-hidden="true" /> 001 234 5678
          </li>
          <li>
              <span className="fa fa-unlock-alt" aria-hidden="true" > {user} </span>
          </li>
          <li>
            <button  data-toggle="modal" data-target="#myModal2" onClick={this.Logout}>
              <span className="fa fa-pencil-square-o" aria-hidden="true"  /> Đăng Xuất </button>
          </li>
        </ul>
        );
      }
      else
      {
        return (
          <ul>
          <li>
            <a className="play-icon popup-with-zoom-anim" >
              <span className="fa fa-map-marker" aria-hidden="true" /> Shop Locator</a>
          </li>
          <li>
            <a  data-toggle="modal" data-target="#myModal1">
              <span className="fa fa-truck" aria-hidden="true" />Track Order</a>
          </li>
          <li>
            <span className="fa fa-phone" aria-hidden="true" /> 001 234 5678
          </li>
          <li>
            <button  data-toggle="modal" data-target="#myModal1" onClick={this.RedirectLogin} >
              <span className="fa fa-unlock-alt" aria-hidden="true" /> Đăng Nhập </button>
          </li>
          <li>
            <button  data-toggle="modal" data-target="#myModal2" onClick={this.RedirectSignup}>
              <span className="fa fa-pencil-square-o" aria-hidden="true"  /> Đăng Ký </button>
          </li>
        </ul>
        );
      }
    }
    render(){
      var {user}=this.state;
      var nameUser =user? user.slice(0,user.length-10):"";
        return (
          <div className="header-bot">
                <div className="header-bot_inner_wthreeinfo_header_mid">
                  {/* header-bot*/}
                  <div className="col-md-4 logo_agile">
                    <h1>
                      <a href="index.html">
                        <span>P</span>huocVo
                        <span>S</span>hop
                        <img src="images/logo2.png" alt=" " />
                      </a>
                    </h1>
                  </div>
              {/* header-bot */}
              <div className="col-md-8 header">
                {/* header lists */}
               
              {this.ShowInfo(nameUser)}
                <div className="agileits_search">
                  <form action="#" method="post">
                    <input name="Search" type="search" placeholder="Bạn cần tìm gì?" />
                    <button type="submit" className="btn btn-default" aria-label="Left Align">
                      <span className="fa fa-search" aria-hidden="true"> </span>
                    </button>
                  </form>
                </div>
              
                <div className="top_nav_right">
                  <div className="wthreecartaits wthreecartaits2 cart cart box_1">
                    <form action="#" method="post" className="last">
                   
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