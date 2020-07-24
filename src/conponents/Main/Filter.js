import React, {Component} from 'react';

class Filter extends Component{
    render(){
        return (
            <div className="side-bar col-md-3">
            <div className="search-hotel">
              <h3 className="agileits-sear-head">Tìm Kiếm</h3>
              <form >
                <input type="search" placeholder="Tên Sách..." name="search" required />
                <input type="submit" value="" />
              </form>
            </div>
            {/* price range */}
            <div className="range">
              <h3 className="agileits-sear-head">Giá</h3>
              <ul className="dropdown-menu6">
                <li>
                  <div id="slider-range" className="ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all"><div className="ui-slider-range ui-widget-header" style={{left: '0.555556%', width: '66.1111%'}} /><a className="ui-slider-handle ui-state-default ui-corner-all" href="#" style={{left: '0.555556%'}} /><a className="ui-slider-handle ui-state-default ui-corner-all" href="#" style={{left: '66.6667%'}} /></div>
                  <input type="text" id="amount" style={{border: 0, color: '#ffffff', fontWeight: 'normal'}} />
                </li>
              </ul>
            </div>
            {/* //price range */}
            {/* food preference */}
            <div className="left-side">
              <h3 className="agileits-sear-head">Tác Giả</h3>
              <ul>
                <li>
                  <input type="checkbox" className="checked" />
                  <span className="span">Vegetarian</span>
                </li>
                <li>
                  <input type="checkbox" className="checked" />
                  <span className="span">Non-Vegetarian</span>
                </li>
              </ul>
            </div>
            {/* //food preference */}
            {/* discounts */}
            <div className="left-side">
              <h3 className="agileits-sear-head">Nhà Xuất Bản</h3>
              <ul>
                <li>
                  <input type="checkbox" className="checked" />
                  <span className="span">5% or More</span>
                </li>
                <li>
                  <input type="checkbox" className="checked" />
                  <span className="span">10% or More</span>
                </li>
                <li>
                  <input type="checkbox" className="checked" />
                  <span className="span">20% or More</span>
                </li>
                <li>
                  <input type="checkbox" className="checked" />
                  <span className="span">30% or More</span>
                </li>
                <li>
                  <input type="checkbox" className="checked" />
                  <span className="span">50% or More</span>
                </li>
                <li>
                  <input type="checkbox" className="checked" />
                  <span className="span">60% or More</span>
                </li>
              </ul>
            </div>
            {/* //discounts */}
            {/* reviews */}
           
            {/* //reviews */}
            {/* cuisine */}
            <div className="left-side">
              <h3 className="agileits-sear-head">Nhà Cung Cấp</h3>
              <ul>
                <li>
                  <input type="checkbox" className="checked" />
                  <span className="span">South American</span>
                </li>
                <li>
                  <input type="checkbox" className="checked" />
                  <span className="span">French</span>
                </li>
                <li>
                  <input type="checkbox" className="checked" />
                  <span className="span">Greek</span>
                </li>
                <li>
                  <input type="checkbox" className="checked" />
                  <span className="span">Chinese</span>
                </li>
                <li>
                  <input type="checkbox" className="checked" />
                  <span className="span">Japanese</span>
                </li>
                <li>
                  <input type="checkbox" className="checked" />
                  <span className="span">Italian</span>
                </li>
                <li>
                  <input type="checkbox" className="checked" />
                  <span className="span">Mexican</span>
                </li>
                <li>
                  <input type="checkbox" className="checked" />
                  <span className="span">Thai</span>
                </li>
                <li>
                  <input type="checkbox" className="checked" />
                  <span className="span">Indian</span>
                </li>
                <li>
                  <input type="checkbox" className="checked" />
                  <span className="span"> Spanish </span>
                </li>
              </ul>
            </div>
            {/* //cuisine */}
            {/* deals */}
           
            {/* //deals */}
          </div>
        );
    }
}

export default Filter;