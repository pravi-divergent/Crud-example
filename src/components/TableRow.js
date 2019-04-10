import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class TableRow extends Component {

  constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
        this.state={business:[],selectedRowKeys: []}
    }
    delete() {console.log('dfdfdsf')
      axios.delete('http://localhost:4000/business/delete/'+this.props.obj._id)
      .then( (response) => {
        this.props.getEmployees();
      })
      .catch(function (error) {
        console.log(error) 
      });
    }
    handleCheck = (e)=>{
      this.props.selectChange({ checked:e.target.checked,id:e.target.id})
    }

  render() {
    return (
        <tr>
          <td>
          <input type="checkbox" onChange={this.handleCheck} id={this.props.obj._id}/>
          </td>
          <td>
            {this.props.obj.first_name}
          </td>
          <td>
            {this.props.obj.last_name}
          </td>
          <td>
            {this.props.obj.age}
          </td>
          <td>
            {this.props.obj.gender}
          </td>
          <td>
            {this.props.obj.email}
          </td>
          <td>
            {this.props.obj.dob}
          </td>
          <td>
            <Link to={"/edit/"+this.props.obj._id} className="btn btn-primary">Edit</Link>
          </td>
          <td>
            <button onClick={this.delete} className="btn btn-danger">Delete</button>
          </td>
        </tr>
    );
  }
}

export default TableRow;