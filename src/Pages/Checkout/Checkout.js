import React, {Component} from 'react';
import CartItem from "./CartItem";
import Cart from "./Cart";
import swal from 'sweetalert';
class Checkout extends Component{

  constructor(props)
  {
    super(props);
    this.state = {
      carts : [],

      //user
      user: [],
       gmail:"",
       address:"",
       phone:"",

      //bill
      bill: [],
      // deliverytime:"",
      // deliveryplace:"",
      // status:"",

      //bill detail
      billdetail: [],
      //sumpay:""

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
  
  render()
  {
      //var {carts, quantity} = this.state;
      var carts = JSON.parse(localStorage.getItem('Cart'));
      var quantity = JSON.parse(localStorage.getItem('Cart')).length;
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
                  <form >
                    <div className="creditly-wrapper wthree, w3_agileits_wrapper">
                      <div className="information-wrapper">
                        <div className="first-row">
                          <div className="controls">
                            <input className="billing-address-name" type="text" name="gmail" placeholder="Nhập Gmail"  />
                          </div>
                          <div className="w3_agileits_card_number_grids">
                            <div className="w3_agileits_card_number_grid_left">
                              <div className="controls">
                                <input type="text" placeholder="Nhập Địa Chỉ" name="address"  />
                              </div>
                            </div>
                            <div className="w3_agileits_card_number_grid_right">
                              <div className="controls">
                                <input type="text" placeholder="Điện Thoại" name="phone"  />
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
                        <button className="submit check_out">Giao Tới Địa Chỉ Trên</button>
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