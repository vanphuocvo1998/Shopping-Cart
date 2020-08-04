import React, {Component} from 'react';
import CartItem from "./CartItem";
import Cart from "./Cart";
import swal from 'sweetalert';
import axios from "axios"
class Checkout extends Component{

  constructor(props)
  {
    super(props);
    this.state = {
      carts : [],
       gmail:"",
       address:"",
       phone:"",
    };
  }

    componentDidMount()
    {
      const OldCart = localStorage.getItem('Cart') ? localStorage.getItem('Cart') : [];
      const ArrayCart = JSON.parse(OldCart);
      this.setState({
        carts : ArrayCart,
      });
    }

    OnChangeQuantity = (value, index) =>{
      // console.log(value);
      // console.log(index);
    //  var {carts} = this.state;
       var Cart = JSON.parse(localStorage.getItem('Cart'));
      if(Cart.length >0)
      {
        if(value !== -1)
        {
          Cart[index].quantity =Cart[index].quantity + value;
          localStorage.setItem("Cart", JSON.stringify(Cart));
          this.setState({
            carts: localStorage.setItem("Cart", JSON.stringify(Cart))
          });
        }
        else
        {
          if(Cart[index].quantity === 1)
          {
            swal("Không thể giảm được nữa!");
          }
          else
          {
            Cart[index].quantity =Cart[index].quantity + value;
            localStorage.setItem("Cart", JSON.stringify(Cart));
            this.setState({
              carts: JSON.parse(localStorage.getItem("Cart"))
            });
          }
        }
      }
    }

    OnDelete = index =>{
        var Cart = JSON.parse(localStorage.getItem('Cart'));
        Cart.splice(index,1);
        localStorage.setItem("Cart", JSON.stringify(Cart));
      this.setState({
        carts: JSON.parse(localStorage.getItem("Cart"))
      }, ()=>swal("Đã Xóa!", "Kiểm tra lại giỏ hàng!", "success"));
    }
    ShowCart = (carts)=>{
      var result = null;
      if(carts.length > 0)
      {
        result=carts.map((cart, index)=>{
          return (
            <CartItem key={index} 
            cart={cart} 
            index={index}
             OnChangeQuantity = {this.OnChangeQuantity}
             OnDelete= {this.OnDelete} />
          )
        });
      }
      return result;
    }
  
    // đặt hàng
    onChange =(e)=>{
      var target = e.target;
      var name = target.name;
      var value = target.type=="checkbox" ? target.checked : target.value;
      this.setState({
        [name]: value
      });
    }

    onSave = (e)=>{
      e.preventDefault();
      const _Cart = JSON.parse(localStorage.getItem('Cart'));
      var {gmail, address, phone} = this.state;
      var user = new FormData();
      user.set('Gmail',gmail);
      user.set('Password',"");
      user.set('Address',address);
      user.set('Phone',phone);
      user.set('Usertype',2);
      axios.post("https://localhost:44348/api/User/AddUser", user)
        .then(res=>{
         //  console.log(res.data);
         //lấy ra ngay giờ hien tai
              // var d = new Date();
              // var n = d.toString();
              var bill = new FormData();
              bill.set('UserId',res.data.id);
              bill.set('Gmail',res.data.gmail);
              bill.set('Phone',res.data.phone);
              bill.set('Deliverytime',"Sau 3 ngày kể từ ngày đặt!");
              bill.set('Deliverytime',res.data.address);
              
              axios.post("https://localhost:44348/api/Bills/AddBill", bill).then(res=>{
                 // console.log(res.data);
                 
                    for(var i=0; i<_Cart.length; i++)
                    {
                        var billdetail = new FormData();
                        billdetail.set('Bill',res.data.id);
                        billdetail.set('Book',_Cart[i].id);
                        billdetail.set('Quantity',_Cart[i].quantity);
                        billdetail.set('Price',_Cart[i].price);
                        billdetail.set('Sumpay',_Cart[i].quantity*_Cart[i].price);
                        axios.post("https://localhost:44348/api/Billdetails/AddBilldetail", billdetail).then(res=>{
                          //console.log(res.data);
                          this.setState({
                            carts : [],
                            gmail:"",
                            address:"",
                            phone:"",
                          }, ()=>{
                            localStorage.setItem("Cart", JSON.stringify(this.state.carts));
                            swal("Đặt Hàng Thành Công!", "Check lại Gmail Or SĐT !", "success")}
                            );
                        }).catch(err=>{
                          console.log(err);
                        });
                   }
              }).catch(err=>{
                console.log(err);
              });

        })
        .catch(err=> {
            console.log(err);
        });
    }

  render()
  {
    var {gmail, address, phone} = this.state;
      //var {carts, quantity} = this.state;
      var carts = JSON.parse(localStorage.getItem('Cart'))? JSON.parse(localStorage.getItem('Cart')): [];
      var quantity = JSON.parse(localStorage.getItem('Cart')).length >0 ? quantity: 0;
        return(
            <div className="privacy">
            <div className="container">
             
              <h3 className="tittle-w3l">Kiểm Tra
                <span className="heading-style">
                  <i />
                  <i />
                  <i />
                </span>
              </h3>
            
              <div className="checkout-right">
                <h4>Giỏ Hàng Của Bạn:
                  <span>{quantity} Sản Phẩm</span>
                </h4>
                <Cart> {this.ShowCart(carts)} </Cart>
              </div>

              
              <div className="checkout-left">
                <div className="address_form_agile">
                  <h4>Nhập Thông Tin Giao Hàng</h4>
                  <form onSubmit={this.onSave}>
                    <div className="creditly-wrapper wthree, w3_agileits_wrapper">
                      <div className="information-wrapper">
                        <div className="first-row">
                          <div className="controls">
                            <input className="billing-address-name"
                             type="text" 
                             name="gmail" 
                             placeholder="Nhập Gmail" 
                             value={gmail}
                             onChange={this.onChange}
                              />
                          </div>
                          <div className="w3_agileits_card_number_grids">
                            <div className="w3_agileits_card_number_grid_left">
                              <div className="controls">
                                <input type="text"
                                 placeholder="Nhập Địa Chỉ" 
                                 name="address"  
                                 value={address}
                                onChange={this.onChange}
                                 />
                              </div>
                            </div>
                            <div className="w3_agileits_card_number_grid_right">
                              <div className="controls">
                                <input type="text" 
                                placeholder="Điện Thoại" 
                                name="phone" 
                                value={phone}
                              onChange={this.onChange} />
                              </div>
                            </div>
                            <div className="clear"> </div>
                          </div>
                          {/* <div className="controls">
                            <input type="text" placeholder="Thành Phố/ Thị Trấn" name="city"  />
                          </div>
                          <div className="controls">
                            <select className="option-w3ls">
                              <option>Giao Tới</option>
                              <option>Nhà</option>
                              <option>Nơi Làm</option>
                            
                            </select>
                          </div> */}
                        </div>
                        <button type="submit">Đặt Hàng Tới Địa Chỉ Trên</button>
                      </div>
                    </div>
                  </form>
                  <div className="checkout-right-basket">
                    <a href="payment.html">Thanh Toán
                      <span className="fa fa-hand-o-right" aria-hidden="true" />
                    </a>
                  </div>
                </div>
                <div className="clearfix"> </div>
              </div>


            </div>
          </div>
	 
        );
    }
  }

export default Checkout;