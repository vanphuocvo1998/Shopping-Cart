import React, {Component} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import swal from 'sweetalert';
import "./Main/Bookitem.css";
class Slide extends Component{
  constructor(props)
    {
        super(props);
        this.state = {
        books: [],
        Cart: [], //danh sách sản phẩm trong giỏ hàng

        // sản phẩm bỏ vào giỏ hàng
        CartItem: {
          id: "",
          img:"",
          name: "",
          price: 0,
          quantity: 0
        }
      }
    }

    componentDidMount(){
        axios.get('https://localhost:44348/api/Books/GetAll')
        .then(res=>{
            this.setState({
              books: res.data
            });
        })
        .catch(err=> {
            console.log(err);
        });
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

     ShowBook = (books)=>{
      var result = null;
      if(books.length > 0)
      {
        result=books.map((book, index)=>{
          return (
            <li className="nbs-flexisel-item" style={{width: '342px'}} key ={index}>
            <div className="w3l-specilamk">
              <div className="speioffer-agile">
                <Link to={`/Products/${book.id}`} >
                  <img src={`${process.env.PUBLIC_URL}/images/${book.img}`} className="bookimg" alt="" />
                </Link>
              </div>
              <div className="product-name-w3l">
                <h6>
                  <Link to={`/Products/${book.id}`}>{book.nameBook}</Link>
                </h6>
                <div className="w3l-pricehkj">
                  <h6>{book.price *(100 - book.sale)}</h6>
                  <p>Tiết kiệm {book.sale}% </p>
                </div>
                <div className="snipcart-details top_brand_home_details item_add single-item hvr-outline-out">
                <form >
                    <input 
                    type="button" 
                    name="addcart" 
                    value="Thêm Giỏ Hàng"  
                    className="button" 
                      onClick={()=>this.AddCart(book.id)}
                    />           
                  </form>
                </div>
              </div>
            </div>
          </li>
          )
        });
      }
      return result;
    }
    render(){
      var {books} = this.state;
        return(
            <div className="featured-section" id="projects">
        <div className="container">
          {/* tittle heading */}
          <h3 className="tittle-w3l">Sách Nổi Bật
            <span className="heading-style">
              <i />
              <i />
              <i />
            </span>
          </h3>
          {/* //tittle heading */}
          <div className="content-bottom-in">
            <div className="nbs-flexisel-container"><div className="nbs-flexisel-inner">
                <ul  className="nbs-flexisel-ul" style={{left: '-342px'}}>
                     {this.ShowBook(books)}
                </ul>
                  <div className="nbs-flexisel-nav-left" style={{top: '174px'}} /></div>
                  <div className="nbs-flexisel-nav-right" style={{top: '174px'}} /></div>
                  
          </div>
        </div>
      </div>
        );
    }
}

export default Slide;