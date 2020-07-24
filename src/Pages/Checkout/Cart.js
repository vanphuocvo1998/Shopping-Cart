import React, {Component} from 'react';

class Cart extends Component{
    render()
    {
        
        return(
            <div className="table-responsive">
                <table className="timetable_sub">
                    <thead>
                        <tr>
                        <th>Mã</th>
                        <th>Hình</th>
                        <th>Tên</th>
                        <th>Giá</th>
                        <th>Số Lượng</th>
                        <th>Xóa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.children}
                    </tbody>
                </table>
             </div>
        );
    }
}

export default Cart;