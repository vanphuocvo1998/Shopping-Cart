import React, {Component} from 'react';
import "./Bookitem.css";
import axios from "axios";
import swal from 'sweetalert';

class Bookitem extends Component{

    constructor(props)
    {
      super(props);
      this.state ={
        Cart: [], //danh sách sản phẩm trong giỏ hàng

        // sản phẩm bỏ vào giỏ hàng
        CartItem: {
          id: "",
          img:"",
          name: "",
          price: 0,
          quantity: 0,
        }
      };
    }

    AddCart = (_id)=>{
      // lấy ra danh sách cart trong local
        var Cart = localStorage.getItem('Cart') ? localStorage.getItem('Cart') : [];
        //nếu đã tồn tại giỏ hàng
        if(Cart.length > 0)
        {
              // kiểm tra sp vừa chọn đã mua chưa
              var index = this.findIndex(_id);
              if(index === -1) // sp vưa chọn chưa mua, thì add vào giỏ hàng
              {
                axios.get(`https://localhost:44348/api/Books/GetById/${_id}`)
                .then(res=>{
                  //  console.log(res.data);
                    this.setState({
                      CartItem :{
                        id:res.data.id,
                        img: res.data.img,
                        name: res.data.nameBook,
                        price: res.data.price,
                        quantity: 1
                      }
                    }, ()=>{ 
                    var {Cart,CartItem} = this.state;
                    const  OldCart = localStorage.getItem('Cart') ? localStorage.getItem('Cart') : [];
                    const arrayCart =  JSON.parse(OldCart); 
                    arrayCart.push(CartItem);
                      this.setState({
                          Cart: arrayCart
                      },()=> localStorage.setItem("Cart", JSON.stringify(arrayCart)));
                      }); 
                })
                .catch(err=> {
                    console.log(err);
                });
              }
              else // nếu sp vừa chọn đã mua rồi thì tăng số lượng và giá lên
              {
                axios.get(`https://localhost:44348/api/Books/GetById/${_id}`)
                              .then(res=>{
                                // tìm vị trí sp đã mua trong giỏ hàng
                                const  _OldCart = localStorage.getItem('Cart') ;
                                const _arrayCart =  JSON.parse(_OldCart);  
                                var index = this.findIndex(res.data.id);
                                  this.setState({
                                    CartItem :{
                                      id:res.data.id,
                                      img: res.data.img,
                                      name: res.data.nameBook,
                                      // tăng số lượng và giá tiền lên
                                      price: res.data.price * (_arrayCart[index].quantity +1),
                                      quantity: _arrayCart[index].quantity +1
                                    }
                                  }, ()=>{ 
                                    // cập nhật lại trong local storage và state Cart
                                    var {CartItem} = this.state;
                                    const  OldCart = localStorage.getItem('Cart') ? localStorage.getItem('Cart') : "[]";
                                    const arrayCart =  JSON.parse(OldCart);  
                                    var index = this.findIndex(CartItem.id);
                                    arrayCart[index].price = CartItem.price;
                                    arrayCart[index].quantity = CartItem.quantity;
                                    this.setState({
                                        Cart: arrayCart
                                    },()=>localStorage.setItem("Cart", JSON.stringify(arrayCart)));
                                    });
                                  
                              })
                              .catch(err=> {
                                  console.log(err);
                              });
            }

        }
        else // nếu giỏ hàng rỗng thì tiến hành mua hàng và lưu vào local storage
        {
          axios.get(`https://localhost:44348/api/Books/GetById/${_id}`)
          .then(res=>{

              this.setState({
                CartItem :{
                  id:res.data.id,
                  img: res.data.img,
                  name: res.data.nameBook,
                  price: res.data.price,
                  quantity: 1
                }
              }, ()=>{ 
                var {CartItem} = this.state;
            
              var arrayCart = [];
              arrayCart.push(CartItem);
                this.setState({
                    Cart: arrayCart
                },()=> localStorage.setItem("Cart", JSON.stringify(arrayCart)));
                });
          })
          .catch(err=> {
              console.log(err);
          });
        }
        swal("Thêm Vào Giỏ Hàng Thành Công!", "Vui Lòng Kiểm Tra Lại Giỏ Hàng!", "success");
    }

    findIndex = (_id)=>{
     
     // var{Cart}= this.state;
     var Cart = JSON.parse(localStorage.getItem('Cart'));
     var vitri = -1;
      if(Cart.length >0)
      {
        Cart.forEach((item, index) => {
              if(item.id === _id)
              {
                  vitri= index;
              }
           });
      }
      return vitri;
  }
    render(){
        var {book,bookbytype ,index} = this.props;
        if(bookbytype)
        {
          return(
            <div className="col-md-4 product-men" key ={index}>
            <div className="men-pro-item simpleCart_shelfItem">
              <div className="men-thumb-item" >
                <img src={`${process.env.PUBLIC_URL}/images/${bookbytype.img}`} className="bookimg" alt="" />
                <div className="men-cart-pro">
                  <div className="inner-men-cart-pro">
                    <a href="single.html" className="link-product-add-cart">Chi Tiết</a>
                  </div>
                </div>
                <span className="product-new-top">New</span>
              </div>
              <div className="item-info-product ">
                <h6>
                  <a href="single.html">{bookbytype.nameBook}</a>
                </h6>
                <div className="info-product-price">
                  <span className="item_price">{bookbytype.price} VND</span>
                  <del>{bookbytype.sale} %</del>
                </div>
                <div className="snipcart-details top_brand_home_details item_add single-item hvr-outline-out">
                  <form >
                    <input 
                    type="button" 
                    name="addcart" 
                    value="Thêm Giỏ Hàng"  
                    className="button" 
                      onClick={()=>this.AddCart(bookbytype.id)}
                    />           
                  </form>
                </div>
              </div>
            </div>
          </div>
         
        );
        }
        else
        {
        //console.log(book);
            return(
                <div className="col-md-4 product-men" key ={index}>
                <div className="men-pro-item simpleCart_shelfItem">
                  <div className="men-thumb-item" >
                    <img src={`${process.env.PUBLIC_URL}/images/${book.img}`} className="bookimg" alt="" />
                    <div className="men-cart-pro">
                      <div className="inner-men-cart-pro">
                        <a href="single.html" className="link-product-add-cart">Chi Tiết</a>
                      </div>
                    </div>
                    <span className="product-new-top">New</span>
                  </div>
                  <div className="item-info-product ">
                    <h6>
                      <a href="single.html">{book.nameBook}</a>
                    </h6>
                    <div className="info-product-price">
                      <span className="item_price">{book.price} VND</span>
                      <del>{book.sale} %</del>
                    </div>
                    <div className="snipcart-details top_brand_home_details item_add single-item hvr-outline-out">
                      <form >
                        <input type="button"
                         name="addcart"
                          value="Thêm Giỏ Hàng" 
                          className="button" 
                          onClick={()=>this.AddCart(book.id)}
                          />           
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            
            );
        }
    }
}

export default Bookitem;