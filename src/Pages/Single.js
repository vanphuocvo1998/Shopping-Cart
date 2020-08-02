import React, {Component} from 'react';
import axios from "axios";
import swal from 'sweetalert';
class Single extends Component{
    constructor(props)
    {
        super(props);
        this.state = {
            book: [],
            Cart: [], //danh sách sản phẩm trong giỏ hàng

            // sản phẩm bỏ vào giỏ hàng
            CartItem: {
              id: "",
              img:"",
              name: "",
              price: 0,
              quantity: 0
            }
        };
    }

    componentDidMount()
    {
        var {match} = this.props;
        if(match)
        {
            var id =match.params.id;
           // console.log(id);
           axios.get(`https://localhost:44348/api/Books/GetById/${id}`)
           .then(res=>{

               this.setState({
                   book: res.data
               });
           })
           .catch(err=> {
               console.log(err);
           });
        }
    }

    componentDidUpdate(prevProps, prevState)
    {
        var {match} = this.props;
        if(prevProps.match.params.id !== match.params.id)
        {
          //  console.log("componentDidUpdate");
            var id =match.params.id;
        
             axios.get(`https://localhost:44348/api/Books/GetById/${id}`)
                 .then(res=>{

                     this.setState({
                         book: res.data
                     });
                 })
                 .catch(err=> {
                     console.log(err);
                 });
        }
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
    render()
    {
        var {book} = this.state;
        console.log(book);
        return (

            <div className="banner-bootom-w3-agileits">
              <div className="container">
                {/* tittle heading */}
                <h3 className="tittle-w3l">Chi Tiết
                  <span className="heading-style">
                    <i />
                    <i />
                    <i />
                  </span>
                </h3>
                {/* //tittle heading */}
                <div className="col-md-5 single-right-left ">
                  <div className="grid images_3_of_2">
                    <div className="flexslider">
                      <ul className="slides">
                        <li data-thumb={`${process.env.PUBLIC_URL}/images/${book.img}`}>
                          <div className="thumb-image">
                            <img src={`${process.env.PUBLIC_URL}/images/${book.img}`} data-imagezoom="true" className="img-responsive" alt="" /> </div>
                        </li>
                        
                      </ul>
                      <div className="clearfix" />
                    </div>
                  </div>
                </div>
                <div className="col-md-7 single-right-left simpleCart_shelfItem">
                  <h3>{book.nameBook}</h3>
               
                  <p>
                    <span className="item_price">{book.price *(100 - book.sale)} VND</span>
                    <del>{book.price} VND</del>
                    <label>Giao Hàng Miễn Phí</label>
                  </p>
                  
               
                  <div className="product-single-w3l">
                    <p>
                      <i className="fa fa-hand-o-right" aria-hidden="true" />Chi tiết</p>
                    <ul>
                      <li>
                        {book.content}
                      </li>
                     
                    </ul>
                   
                  </div>
                  <div className="occasion-cart">
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
                <div className="clearfix"> </div>
              </div>
            </div>
          );
    }
}

export default Single;