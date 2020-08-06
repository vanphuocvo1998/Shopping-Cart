import React, {Component} from 'react';
import axios from "axios"
class LoginForm extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
        Gmail:"",
        Password:"",
      
        }
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
        })
        .catch(err=> {
            console.log(err);
        });
      }

    render(){
        var {Gmail, Password} = this.state;
       
        return (
          //classname: modal fade
            // <div className="" id="myModal1" tabIndex={-1} role="dialog">
            //   <div className="modal-dialog">
        
            //     <div className="modal-content">
            //       <div className="modal-header">
            //         <button type="button" className="close" data-dismiss="modal">×</button>
            //       </div>
            //       <div className="modal-body modal-body-sub_agile">
            //         <div className="main-mailposi">
            //           <span className="fa fa-envelope-o" aria-hidden="true" />
            //         </div>
            //         <div className="modal_body_left modal_body_left1">
            //           <h3 className="agileinfo_sign">Đăng Nhập </h3>
            //           <p>
            //             Chưa có tài khoản?
            //             <a href="#" data-toggle="modal" data-target="#myModal2">
            //              Tạo tài khoản ngay!</a>
            //           </p>
            //           <form onSubmit={this.onSave}>
            //             <div className="styled-input agile-styled-input-top">
            //               <input type="text"
            //                placeholder="User Name" 
            //               name="Gmail" 
            //               value={Gmail}
            //               onChange={this.OnChange}
            //                />
            //             </div>
            //             <div className="styled-input">
            //               <input type="password" 
            //               placeholder="Password"
            //                name="Password" 
            //                value={Password}
            //               onChange={this.OnChange}
            //                 />
            //             </div>
            //             <button type="submit" className="btn btn-primary"
            //             >Đăng nhập</button>
            //             {/* <button type="submit" className="btn btn-primary close "  value="Đăng Nhập" /> */}
            //           </form>
            //           <div className="clearfix" />
            //         </div>
            //         <div className="clearfix" />
            //       </div>
            //     </div>
            
            //   </div>
             <div></div>
        )
    }
}

export default LoginForm;