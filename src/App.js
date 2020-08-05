import React, {Component} from 'react';
import Menu from "./conponents/Menu";
import Headertop from './conponents/Headertop';
import Slide from './conponents/Slide';
import Footer from "./conponents/Footer";
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import routes from "./routes";

import LoginForm from './conponents/LoginForm';
import SignupForm from './conponents/SignupForm';

class App extends Component {

  constructor(props)
    {
      super(props);
      this.state={
        Gmail:"",
        Password:"",
        IsLogin: false,
        closeform:false,
      }
    }

  IsLogin = (IsLogin, Gmail, Password)=>{
  //  console.log(IsLogin);
  //  console.log(Gmail);
  //   console.log(Password);
    // this.setState({
    //   Gmail: Gmail,
    //   Password:Password,
    //   IsLogin: IsLogin
    // });
  }

  closeform = (value)=>{
    this.setState({
      closeform: value
    });
  
  }
  ShowContent = (routes)=>{
    var result =null;
    if(routes.length >0)
    {
      result = routes.map((route, index) => {
        return(
        <Route key={index} path={route.path} exact={route.exact} component={route.main} />
        );
      });
    }
    return <Switch>{result}</Switch>
  }

  render(){ 
    var {closeform} = this.state;
    return (
      <Router>
            <div>
                <div className="header-most-top">
                  <p>Grocery Offer Zone Top Deals &amp; Discounts</p>
                </div>
                <Headertop User={this.state.Gmail} closeform={this.closeform} />
          {/* show city */}
            {/* //shop locator (popup) */}
            {/* signin Model */}
            {/* Modal1 */}
            <LoginForm _IsLogin={this.IsLogin} closeform={closeform}/>
            <SignupForm />
            <Menu />
            
            {this.ShowContent(routes)}
            <Slide />
       
            <Footer />
            {/* //footer */}
            {/* copyright */}
            <div className="copy-right">
              <div className="container">
                <p>Số 1, Võ Văn Ngân, Thủ Đức, PHCM
                  <a href="">HCMUTE</a>
                </p>
              </div>
            </div>
              
            <a href="#" id="toTop" style={{display: 'none'}}><span id="toTopHover" />To Top</a>
          </div>
      </Router>
    );
  }
}

export default App;
