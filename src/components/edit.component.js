import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
// import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';


export default class Edit extends Component {
  constructor(props) {
    super(props);
    // this.onChangePersonName = this.onChangePersonName.bind(this);
    // this.onChangeBusinessName = this.onChangeBusinessName.bind(this);
    // this.onChangeGstNumber = this.onChangeGstNumber.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      first_name: '',
      last_name: '',
      age:'',
      gender:'',
      email:'',
      dob: ''
    }
  }

  componentDidMount() {
     this.getEmplopoiyees();
    }

  getEmplopoiyees = () => {
    axios.get('http://localhost:4000/business/edit/'+this.props.match.params.id)
    .then(response => {
        this.setState({ 
          first_name: response.data.first_name, 
          last_name: response.data.last_name,
          age: response.data.age,
          gender: response.data.gender,
          email: response.data.email,
          dob: response.data.dob   });
    })
    .catch(function (error) {
        console.log(error);
    })
  }
  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onChangeGender = (e) =>{
      this.setState({
        gender: e.target.value
      });
    }
    handleDateChange = (date) => {
      this.setState({ dob: date })
    }
  
  onSubmit(e) {
    e.preventDefault();
    const obj = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      age: this.state.age,
      gender: this.state.gender,
      email: this.state.email,
      dob: this.state.dob
    };
    axios.post('http://localhost:4000/business/update/'+this.props.match.params.id, obj)
        .then(res => this.props.history.push('/index'));
    
   
  }
 
  render() {
    console.log(">>", this.state)
    return (
        <div style={{ marginTop: 10 }}>
            <h3 align="center">Update Employee</h3>
            <form onSubmit={this.onSubmit}>
            <div className="form-group">
                    <label>First Name:  </label>
                    <input 
                      type="text"
                      name="first_name" 
                      className="form-control" 
                      value={this.state.first_name}
                      onChange={this.handleChange}
                      />
                </div>
                <div className="form-group">
                    <label>Last Name: </label>
                    <input type="text" 
                    name="last_name"
                      className="form-control"
                      value={this.state.last_name}
                      onChange={this.handleChange}
                      />
                </div>
                
                <div className="form-group">
                    <label>age: </label>
                    <input type="number"
                    name="age"
                      className="form-control"
                      value={this.state.age}
                      onChange={this.handleChange}
                      />
                </div>
                <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="male" 
                                    id="male" 
                                    value="male"
                                    checked={this.state.gender==='male'} 
                                    onChange={this.onChangeGender}
                                    />
                            <label className="form-check-label">Male</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="female" 
                                    id="female" 
                                    value="female" 
                                    checked={this.state.gender==='female'} 
                                    onChange={this.onChangeGender}
                                    />
                            <label className="form-check-label">Female</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="others" 
                                    id="others" 
                                    value="others" 
                                    checked={this.state.gender==='others'} 
                                    onChange={this.onChangeGender}
                                    />
                            <label className="form-check-label">Others</label>
                        </div>
                    </div>

                <div className="form-group">
                    <label>Email: </label>
                    <input type="text" 
                    name="email"
                      className="form-control"
                      value={this.state.email}
                      onChange={this.handleChange}
                      />
                </div>
                
                <div className="form-group">
                    <label>DOB: </label>
                    <DatePicker
              selected={ this.state.dob ? this.state.dob : null }
              onChange={ this.handleDateChange }
            />
           
                </div>
                <div className="form-group">
                    <input type="submit" 
                      value="Edit Employee" 
                      className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
  }
}