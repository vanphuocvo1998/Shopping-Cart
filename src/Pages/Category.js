import React, {Component} from 'react';
import Booklist from "./../conponents/Main/Booklist";
import Bookitem from "./../conponents/Main/Bookitem";
import Filter from "./../conponents/Main/Filter";
import axios from 'axios';
class Category extends Component{
    
    constructor(props)
    {
        super(props);
        this.state = {
            books: []
        };
    }
    
    // lần đầu dùng didmount để load data từ csdl xuống sau khi chọn loại sách lần đầu tiên
    componentDidMount()
    {
        
        var {match} = this.props;
        if(match)
        {
            var id =match.params.id;
        
             axios.get(`https://localhost:44348/api/Books/GetByType/${id}`)
                 .then(res=>{

                     this.setState({
                         books: res.data
                     });
                 })
                 .catch(err=> {
                     console.log(err);
                 });
        }
       
    }

    // chọn loại sách lần t2 trở đi, didupdate sẽ được chạy nếu tham số url lần hiện tại, nếu khác với lần trước thì sẽ render lại
    componentDidUpdate(prevProps, prevState)
    {
        var {match} = this.props;
        if(prevProps.match.params.id !== match.params.id)
        {
            console.log("componentDidUpdate");
            var id =match.params.id;
        
             axios.get(`https://localhost:44348/api/Books/GetByType/${id}`)
                 .then(res=>{

                     this.setState({
                         books: res.data
                     });
                 })
                 .catch(err=> {
                     console.log(err);
                 });
        }
    }

    ShowBook = (books)=>{
        var result = null;
        if(books.length > 0)
        {
          result=books.map((book, index)=>{
            return (
               <Bookitem key={index} bookbytype={book} index={index} />
            )
          });
        }
        return result;
      }
    render()
    {
        var {books} = this.state;
      
        return(
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

export default Category;