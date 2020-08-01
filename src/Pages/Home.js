import React, {Component} from 'react';
import Filter from './../conponents/Main/Filter';
import Booklist from './../conponents/Main/Booklist';
import Bookitem from './../conponents/Main/Bookitem';
//link
//axios lấy data
import axios from 'axios';

class Home extends Component{
    constructor(props)
    {
        super(props);
        this.state = {
        books: []
        };
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

     ShowBook = (books)=>{
        var result = null;
        if(books.length > 0)
        {
          result=books.map((book, index)=>{
            return (
               <Bookitem key={index} book={book} index={index} />
            )
          });
        }
        return result;
      }
    render(){
        var {books} = this.state;
        return (
            <div className="ads-grid">
                    <div className="container">
                
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
                            
                            <Booklist>{this.ShowBook(books)}</Booklist>
                            
                            </div>
                        </div>
                    
                    </div>
            </div>
        );
    }
}

export default Home;