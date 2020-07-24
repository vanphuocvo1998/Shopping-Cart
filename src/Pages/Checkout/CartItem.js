import React, {Component} from 'react';
import "./CartItem.css";
class CartItem extends Component
{
    ClickchangeSize = value =>{
       // this.props.changeSize(value);
    }
    render(){
        var {cart, index} = this.props;
        return (
            <tr className="rem1" key = {index}>
                <td className="invert">{cart.id}</td>
                <td className="invert-image">
                <a href="single2.html">
                    <img src={`${process.env.PUBLIC_URL}/images/${cart.img}`} alt=" " className="img-responsive cartimg" name="cartimg"/>
                </a>
                </td>
                <td className="invert">{cart.name}</td>
                <td className="invert">{cart.price}</td>
                <td className="invert">
                <div className="quantity">
                    <div className="quantity-select" onClick={()=>this.ClickchangeSize(-1)}>
                    <div className="entry value-minus">&nbsp;</div>
                    <div className="entry value">
                        <span>{cart.quantity}</span>
                    </div>
                    <div className="entry value-plus active" onClick={()=>this.ClickchangeSize(+1)}>&nbsp;</div>
                    </div>
                </div>
                </td>
                <td className="invert">
                <div className="rem">
                    <div className="close1"> </div>
                </div>
                </td>
          </tr>
       
        );
    }
}

export default CartItem;