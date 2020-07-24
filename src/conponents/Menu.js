import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import Typeproduct from './Typeproduct';

const menus = [
  {
    name: "Trang Chủ",
    to: "/",
    exact: true
  },
  {
    name: "Liên Hệ",
    to: "/about",
    exact: false
  },
  {
    name: "Check Out",
    to: "/Checkout",
    exact: false
  }
];

const MenuLink = ({label, to, ActionlyWhenExact})=>{
  return (
    <Route
      path={to}
      exact={ActionlyWhenExact}
      children={({match})=>{
        var active = match ? "active abc" : "";
        return (
        <li className={active}>

           <Link to ={to} className="my-Link"> {label} </Link>

         </li>
        )
      }}
    />
  )
}
class Menu extends Component
{
    ShowMenu =(_menus)=>{
      var result =null;
      if(_menus.length !== 0)
      {
          result=_menus.map((menu, index)=>{
              return (
              <MenuLink key={index} label={menu.name} to = {menu.to} ActionlyWhenExact={menu.exact} />
              )
          });
      }
      return result;
    }
    render(){
     
        return (
            <div className="ban-top">
        <div className="container">
          <Typeproduct />
          <div className="top_nav_left">
            <nav className="navbar navbar-default">
              <div className="container-fluid">
                {/* Brand and toggle get grouped for better mobile display */}
                <div className="navbar-header">
                  <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar" />
                    <span className="icon-bar" />
                    <span className="icon-bar" />
                  </button>
                </div>
                {/* Collect the nav links, forms, and other content for toggling */}
                <div className="collapse navbar-collapse menu--shylock" id="bs-example-navbar-collapse-1">
                  <ul className="nav navbar-nav menu__list">
                    {this.ShowMenu(menus)}
                   </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
        );
    }
}


export default Menu;