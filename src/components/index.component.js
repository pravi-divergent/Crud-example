import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './TableRow';

export default class Index extends Component {

  buttonDisable=false;
  constructor(props) {
      super(props);
      this.state = {business: [],idArray:[]};
    }

    componentDidMount(){
      this.getAllEmployeesList();
    }

    getAllEmployeesList = () => {
      axios.get('http://localhost:4000/business')
        .then(response => {
          this.setState({ business: response.data });
        })
        .catch(function (error) {
          console.log(error);
        })
    }


    changeDetect= (data)=>{
      console.log(data);
      let idChangeArray= [...this.state.idArray]
      console.log(">1111", idChangeArray)
      if(data.checked){
        idChangeArray.push(data.id);
      } else {
        let indexVal = idChangeArray.findIndex(dataId => dataId === data.id);
        idChangeArray.splice(indexVal, 1);
      }
      console.log(">", idChangeArray)
       this.setState({ idArray: idChangeArray })
    }


    multipleDelete = () =>{     
      console.log("in")
       axios.post('http://localhost:4000/business/deletetMulti', this.state.idArray)
      .then(() => {
        this.getAllEmployeesList();
      }).catch(err => {
        console.log("err", err)
      })
    }
      


    tabRow(){
      return this.state.business.map((object, i) => {
          return <TableRow obj={object} key={i} getEmployees={this.getAllEmployeesList} selectChange={this.changeDetect}/>;
      });
    }
  
    render() {
      return (
        <div>
          <h3 align="center">Employee List</h3>
          <button className="btn btn-danger" onClick={this.multipleDelete} disabled={this.buttonDisable}> Delete Multiple</button>
          <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>CheckBox</th>
                <th>FirstName</th>
                <th>LastName</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Email</th>
                <th>DOB</th>
                <th colSpan="2">Action</th>
              </tr>
            </thead>
            <tbody>
              { this.tabRow() }
            </tbody>
          </table>
        </div>
      );
    }
  }