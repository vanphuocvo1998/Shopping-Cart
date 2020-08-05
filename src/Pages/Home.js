import React, {Component} from 'react';
import Filter from './../conponents/Main/Filter';
import Booklist from './../conponents/Main/Booklist';
import Bookitem from './../conponents/Main/Bookitem';
import "./Home.css";
//link
//axios lấy data
import axios from 'axios';

class Home extends Component{
    constructor(props)
    {
        super(props);
        this.state = {
        books: [],
        filterName:"",
        checkedAuthor:"",
        checkedPub:"",
        checkedPro:""
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

     OnFilter = filtername =>{
      //   console.log(filtername);
          this.setState({
              filterName: filtername.toLowerCase()
          });
     }

     SelectAuthor = checked =>{
        console.log(checked);
            // this.setState({
            //     checkedAuthor: checked.toLowerCase()
            // });
       }

       SelectPublisher = checked =>{
        console.log(checked);
            // this.setState({
            //     checkedPub: checked.toLowerCase()
            // });
       }

       SelectProvider = checked =>{
           console.log(checked);
            // this.setState({
            //     checkedPro: checked.toLowerCase()
            // });
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
        var {books, filterName, checkedAuthor, checkedPro,checkedPub} = this.state;
        if(filterName)
        {
            books = books.filter((book)=>{
                    return book.nameBook.toLowerCase().indexOf(filterName) !== -1; // chuyển sang chữ thường, và xét chuỗi có nằm trong chuỗi con hay ko
                });
        }
        // if(checkedAuthor)
        // {
        //     books = books.filter((book)=>{
        //             return book.nameBook.toLowerCase().indexOf(checkedAuthor) !== -1; // chuyển sang chữ thường, và xét chuỗi có nằm trong chuỗi con hay ko
        //         });
        // }
        // if(checkedPro)
        // {
        //     books = books.filter((book)=>{
        //             return book.nameBook.toLowerCase().indexOf(checkedPro) !== -1; // chuyển sang chữ thường, và xét chuỗi có nằm trong chuỗi con hay ko
        //         });
        // }
        // if(checkedPub)
        // {
        //     books = books.filter((book)=>{
        //             return book.nameBook.toLowerCase().indexOf(checkedPub) !== -1; // chuyển sang chữ thường, và xét chuỗi có nằm trong chuỗi con hay ko
        //         });
        // }

        return (
            <div className="ads-grid">
                    <div className="container">
                
                        <h3 className="tittle-w3l" id ="tittle-w3l">Sách Đang Bán
                            <span className="heading-style">
                            <i />
                            <i />
                            <i />
                            </span>
                        </h3>
                
                        {/* product left */}
                        <Filter  _OnFilter= {this.OnFilter}
                         _CheckedAu={this.SelectAuthor}
                        _CheckedPub= {this.SelectPublisher}
                        _CheckedPro = {this.SelectProvider}
                         />
                    
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