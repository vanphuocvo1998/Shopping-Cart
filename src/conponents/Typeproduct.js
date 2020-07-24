import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class Typeproduct extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
        categories: [],
        seletedvalue: ""
        };
    }
    componentDidMount(){
        axios.get('https://localhost:44348/api/Booktypes/GetAll')
        .then(res=>{
            this.setState({
                categories: res.data,
                seletedvalue: ""
            });
        })
        .catch(err=> {
            console.log(err);
        });
     }

     ShowCategories = (categories)=>{
        var result = null;
        //console.log(categories);
        if(categories.length > 0)
        {
          result=categories.map((category, index)=>{
            return (          
                    <option key={index} value={category.id}>{category.name}</option>
            )
          });
        }
        return result;
      }

      GetValue=e=>{
          this.setState({
            seletedvalue: e.target.value
          });
      }

    render(){
        var {categories,seletedvalue} = this.state;
     //   console.log(seletedvalue);

        if(seletedvalue!=="")
        {
            return (
    
                <div className="agileits-navi_search">
                    <form>
                        <Link to={`/Category/${seletedvalue}`}>  
                            <select id="agileinfo-nav_search" name="agileinfo_search" required onChange={this.GetValue}>    
                                <option value="">Tất Cả</option>
                                {this.ShowCategories(categories)}
                            </select>
                        </Link>
                    </form>
            </div>

            );
        }
        else
        {
            return (
    
                <div className="agileits-navi_search">
                    <form>
                        <Link to="/">  
                            <select id="agileinfo-nav_search" name="agileinfo_search" required onChange={this.GetValue}>    
                                <option value="">Tất Cả</option>
                                {this.ShowCategories(categories)}
                            </select>
                        </Link>
                    </form>
            </div>

            );
        }
    }
}

export default Typeproduct;