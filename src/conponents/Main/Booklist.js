import React, {Component} from 'react';

class Booklist extends Component{
    render()
    {
        return(
            <div className="product-sec1">
            <h3 className="heading-tittle">Sách</h3>

            {this.props.children}
            <div className="clearfix" />
          </div>
        );
    }
}

export default Booklist;