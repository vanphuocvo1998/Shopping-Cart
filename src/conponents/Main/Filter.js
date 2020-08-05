import React, {Component} from 'react';
import "./Filter.css";
import axios from "axios";
class Filter extends Component{

  constructor(props)
  {
    super(props)
    this.state ={
      filterName: "",
      Authors: [],
      Publishers:[],
      Providers:[],
      checkedau:"",
      checkedpub:"",
      checkedpro:"",
      Arraycheckedau:[],
      Arraycheckedpub:[],
      Arraycheckedpro:[]
    }
  }

  componentDidMount(){
    axios.get('https://localhost:44348/api/Authors/GetAll')
    .then(res=>{
       // console.log(res.data);
        this.setState({
          Authors: res.data
        });
    })
    .catch(err=> {
        console.log(err);
    });

    axios.get('https://localhost:44348/api/Publishers/GetAll')
    .then(res=>{
       // console.log(res.data);
        this.setState({
          Publishers: res.data
        });
    })
    .catch(err=> {
        console.log(err);
    });

    axios.get('https://localhost:44348/api/Providers/GetAll')
    .then(res=>{
     //   console.log(res.data);
        this.setState({
          Providers: res.data
        });
    })
    .catch(err=> {
        console.log(err);
    });
 }

  onChange = e=>{
    var {Arraycheckedau,Arraycheckedpub,Arraycheckedpro} = this.state;
    var target = e.target;
    var name = target.name;
  //  var value = target.type=="checkbox" ? target.value : target.value;
    var value = target.value;
    this.props._OnFilter(name==="filterName" ? value : this.state.filterName);
     this.props._CheckedAu(name==="checkedau" ? Arraycheckedau.push(value) : []);
     this.props._CheckedPub(name==="checkedpub" ? Arraycheckedpub.push(value) :[]);
     this.props._CheckedPro(name==="checkedpro" ? Arraycheckedpro.push(value) : []);
    this.setState({
        [name] : value
    });
  //  console.log(value);
  }

  ShowAuthors =(authors)=>{
    var result = null;
    if(authors.length > 0)
    {
      result=authors.map((author, index)=>{
        return (
          <li key={index}>
              <input type="checkbox" 
              className="checkedau"
              name="checkedau"
               value={author.id} 
              //  checked={author?true:false}
               onChange={this.onChange} />
              <span className="span">{author.name}</span>
            </li>
        )
      });
    }
    return result;
  }

  ShowPublishers =(publishers)=>{
    var result = null;
    if(publishers.length > 0)
    {
      result=publishers.map((publisher, index)=>{
        return (
          <li key={index}>
              <input type="checkbox"
              name="checkedpub"
               className="checkedpub"
                value={publisher.id} 
                // checked={publisher?true:false}
                onChange={this.onChange} />
              <span className="span">{publisher.name}</span>
            </li>
        )
      });
    }
    return result;
  }

  ShowProiders =(providers)=>{
    var result = null;
    if(providers.length > 0)
    {
      result=providers.map((provider, index)=>{
        return (
          <li key={index}>
              <input type="checkbox" 
              name="checkedpro"
              className="checkedpro" 
              value={provider.id} 
              // checked={provider?true:false} 

              onChange={this.onChange}
              />
              <span className="span">{provider.name}</span>
            </li>
        )
      });
    }
    return result;
  }
    render(){
      var {filterName, Authors, Publishers, Providers} =this.state;
        return (
            <div className="side-bar col-md-3">
            <div className="search-hotel">
              <h3 className="agileits-sear-head">Tìm Kiếm</h3>
              <div >
                <input type="search" 
                placeholder="Tên Sách..."
                 name="filterName" 
                 className="filterName"
                 id="filterName"
                 value={filterName}
                
                 onChange={this.onChange} />
                {/* <input type="submit" value="" className="btnsearch" /> */}
              </div>
            </div>
            {/* price range */}
            {/* <div className="range">
              <h3 className="agileits-sear-head">Giá</h3>
              <ul className="dropdown-menu6">
                <li>
                  <div id="slider-range" className="ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all"><div className="ui-slider-range ui-widget-header" style={{left: '0.555556%', width: '66.1111%'}} /><a className="ui-slider-handle ui-state-default ui-corner-all" href="#" style={{left: '0.555556%'}} /><a className="ui-slider-handle ui-state-default ui-corner-all" href="#" style={{left: '66.6667%'}} /></div>
                  <input type="text" id="amount" style={{border: 0, color: '#ffffff', fontWeight: 'normal'}} />
                </li>
              </ul>
            </div> */}
            {/* //price range */}
            {/* food preference */}
            <div className="left-side">
              <h3 className="agileits-sear-head">Tác Giả</h3>
              <ul>
                
               {this.ShowAuthors(Authors)}
              </ul>
            </div>
            {/* //food preference */}
            {/* discounts */}
            <div className="left-side">
              <h3 className="agileits-sear-head">Nhà Xuất Bản</h3>
              <ul>
               
                {this.ShowPublishers(Publishers)}
              </ul>
            </div>
            {/* //discounts */}
            {/* reviews */}
           
            {/* //reviews */}
            {/* cuisine */}
            <div className="left-side">
              <h3 className="agileits-sear-head">Nhà Cung Cấp</h3>
              <ul>
                
                {this.ShowProiders(Providers)}
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