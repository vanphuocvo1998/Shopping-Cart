import React, {Component} from 'react';
import Filter from './Filter';
import Booklist from './Booklist';


class Main extends Component{
    render(){
        return (
            <div className="ads-grid">
        <div className="container">
          {/* tittle heading */}
          <h3 className="tittle-w3l">Sách Đang Bán
            <span className="heading-style">
              <i />
              <i />
              <i />
            </span>
          </h3>
    
          {/* product left */}
          <Filter />
    
          {/* product right */}
          <div className="agileinfo-ads-display col-md-9">
            <div className="wrapper">
             
              <Booklist />
              
            </div>
          </div>
        
        </div>
      </div>
        );
    }
}

export default Main;