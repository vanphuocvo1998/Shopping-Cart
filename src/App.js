import React, {Component} from 'react';
import Menu from "./conponents/Menu";
import Headertop from './conponents/Headertop';
import Slide from './conponents/Slide';
import Footer from "./conponents/Footer";
import { Switch, Route, BrowserRouter as Router, Link } from 'react-router-dom';
import axios from "axios";
import routes from "./routes";

class App extends Component {

  constructor(props)
    {
      super(props);
      this.state={
        Gmail:"",
        Password:"",
        OpenLogin: false
      }
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

  OpenLogin = (value) =>{
    //console.log(value);
    this.setState({
      OpenLogin: true
    });
  }
  OnChange = e=>{
    var target = e.target;
    var name = target.name;
    var value = target.type=="checkbox" ? target.checked : target.value;
    this.setState({
      [name]: value
    });
  }

  onSave = e=>{
    e.preventDefault();
    var {Gmail, Password} = this.state;
    var user = new FormData();
    user.set('Gmail',Gmail);
    user.set('Password',Password);
    axios.post("https://localhost:44348/api/User/Login", user)
    .then(res=>{
     // console.log(res);
        localStorage.setItem("User", res.data.gmail);
        this.setState({
          Gmail: res.data.gmail,
          Password: res.data.Password,
            OpenLogin: false
        });
    })
    .catch(err=> {
        console.log(err);
    });
  }

  
  ChangeStatus =()=>{
    this.setState({
      OpenLogin: false
    });
  }

  
  render(){ 
   
    var {OpenLogin, Gmail, Password} = this.state;
    if(OpenLogin===false)
    {
        return (
          <Router>
                <div>
                    <div className="header-most-top">
                      <p>Grocery Offer Zone Top Deals &amp; Discounts</p>
                    </div>
                    <Headertop OpenLogin={this.OpenLogin} Gmail={this.state.Gmail} />
              {/* show city */}
                {/* //shop locator (popup) */}
                {/* signin Model */}
                {/* Modal1 */}
              
                <Menu />
                
                {this.ShowContent(routes)}
                <Slide />
          
                <Footer />
                {/* //footer */}
                {/* copyright */}
                <div className="copy-right">
                  <div className="container">
                    <p>Số 1, Võ Văn Ngân, Thủ Đức, PHCM
                      <a >HCMUTE</a>
                    </p>
                  </div>
                </div>
                  
                <a href="#" id="toTop" style={{display: 'none'}}><span id="toTopHover" />To Top</a>
              </div>
          </Router>
        );
    }
    else
    {
      return(
        <Router>
        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <form  onSubmit={this.onSave}>
           <div className="form-group">
             <label>Tài Khoản:</label>
             <input type="text" 
             className="form-control"
              name="Gmail"
              value={Gmail}
              onChange={this.OnChange}
              />
           </div>
           <div className="form-group">
             <label>Mật Khẩu:</label>
             <input type="number" 
             className="form-control" 
             name="Password"
             value={Password}
             onChange={this.OnChange}
             />
           </div>
            <button type="submit" className="btn btn-primary" >Đăng Nhập</button>
            <button  className="btn btn-danger" > Trở Lại</button>
         </form>
   </div> 
   </Router>
      );
    }
  }
}

export default App;
