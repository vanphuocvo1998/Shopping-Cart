import React, {Component} from 'react';
import Menu from "./conponents/Menu";
import Headertop from './conponents/Headertop';
import Slide from './conponents/Slide';
import Footer from "./conponents/Footer";
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import axios from "axios";
import routes from "./routes";
import swal from 'sweetalert';

class App extends Component {

  constructor(props)
    {
      super(props);
      this.state={
        Gmail:"",
        Password:"",
        Phone: "",
        Address:"",
        OpenLogin: 0, //0: trang chủ, 1: login, 2: singup
        Message:""
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
      OpenLogin: value
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
          OpenLogin: 0,
          Message: "Success"
        },()=>{swal("Đăng nhập thành công!")});
    })
    .catch(err=> {
         this.setState({
          Gmail: "",
         Password: "",
          OpenLogin: 0,
          Message: "Mật khẩu hoặc tài khoản không đúng!"
      });
        console.log(err);
    });
  }

  OnSignup =e=>{
    e.preventDefault();
    var nameshop = "Book Shop";
    var Message="Chào mừng thành viên mới!!!"
    var {Gmail, Password, Phone, Address} = this.state;
    var user = new FormData();
    user.set('Gmail',Gmail);
    user.set('Password',Password);
    user.set('Phone',Phone);
    user.set('Address',Address);
    user.set('Usertype',2);
    axios.post("https://localhost:44348/api/User/AddUser", user)
    .then(res=>{  
       // console.log(res.data);
        this.setState({
          OpenLogin: 0,
          Message: "Success"
        },()=>{
          axios.get(`https://localhost:44348/api/MailSend/SendEmail/${nameshop}/${res.data.gmail}/${Message}`)
          .then(_res=>{
           console.log(_res.data);
          }).catch(_err=>{
           console.log(_err);
          });
          swal("Đăng ký thành công!");});
    })
    .catch(err=> {
         this.setState({
          OpenLogin: 2,
          Message: "Mật khẩu hoặc tài khoản không đúng!"
      });
        console.log(err);
    });
  }
  
  GoBack= ()=>{
    this.setState({
      OpenLogin:0,
      Message:"",
      Gmail:"",
      Password:"",
      Address:"",
      Phone:""
    });
  }

  
  render(){ 
   
    var {OpenLogin, Gmail, Password, Message, Phone, Address} = this.state;

    if(OpenLogin===0)
    {
        return (
          <Router>
                <div>
                    <div className="header-most-top">
                      <p>Grocery Offer Zone Top Deals &amp; Discounts</p>
                    </div>
                    <Headertop OpenLogin={this.OpenLogin} Gmail={this.state.Gmail} Message={Message} />
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
    else if(OpenLogin===2)
    {
      return (
        <Router>
        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <h5 className="danger">Message</h5>
        <form  onSubmit={this.OnSignup}>
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
             <input type="password" 
             className="form-control" 
             name="Password"
             value={Password}
             onChange={this.OnChange}
             />
           </div>
           <div className="form-group">
             <label>Số Điện Thoại:</label>
             <input type="text" 
             className="form-control" 
             name="Phone"
             value={Phone}
             onChange={this.OnChange}
             />
           </div>
           <div className="form-group">
             <label>Địa Chỉ:</label>
             <input type="text" 
             className="form-control" 
             name="Address"
             value={Address}
             onChange={this.OnChange}
             />
           </div>
            <button type="submit" className="btn btn-primary" >Đăng Ký</button>
            <button  className="btn btn-danger" onClick={this.GoBack}> Trở Lại</button>
         </form>
   </div> 
   </Router>
      );
    }
    else
    {
      return(
        <Router>
        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <h5 className="danger">Message</h5>
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
            <button  className="btn btn-danger" onClick={this.GoBack}> Trở Lại</button>
         </form>
   </div> 
   </Router>
      );
    }
  }
}

export default App;
