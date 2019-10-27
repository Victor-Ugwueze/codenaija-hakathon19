import React, { Component } from 'react'
import "../styles/homepage.css"
import { DateTimePicker } from 'react-widgets'
import Moment from 'moment'
import momentLocalizer from 'react-widgets-moment';
// import DateTimePicker from 'react-widgets/lib/DateTimePicker';

Moment.locale('en')
momentLocalizer()

export default class HomePage extends Component {

  state = {
    plate_number: "",
    vin: "",
    license: "",
    location: "",
    datetime: null,
    displayImage: '',
    image: '',
  }

  handleInputChange=(e) => {

    const {name, value} = e.target

    this.setState({
      [name]: value
    })

  }

  onSubmit = (e) => {
    e.preventDefault()
    console.log(this.state)
  }

  handleImageUpload = (event) => {
    this.setState({
      image: event.target.files[0],
      displayImage: URL.createObjectURL(event.target.files[0]) || ''
    });
  };
  render() {
    const {displayImage} = this.state
    return (
      <div className="homepage">
     
<div className="content">
<div className="header-title">
<h1>Report your stolen car</h1>
      </div>
  <form className="homepage-form" onSubmit={this.onSubmit}>
 
  <div className="row row-1">
    <div className="col">
      <input type="text" className="form-control form-control-col" name="plate_number" onChange={this.handleInputChange} placeholder="Plate number"/>
    </div>
    <div className="col">
      <input type="text" className="form-control form-control-col" name="VIN"placeholder="Enter VIN" onChange={this.handleInputChange}/>
    </div>
    <div className="col">
      <input type="text" className="form-control form-control-col" name="license"placeholder="Drivers License" onChange={this.handleInputChange}/>
    </div>
  </div>
  <div className="row row-2">
    <div className="col row-2-col-1">
      <input type="text" className="form-control form-control-col-1 form-control-col" name="location"placeholder="Enter last seen location" onChange={this.handleInputChange}/>
    </div>
    <div className="col row-2-col-2">
    <DateTimePicker
      dropDown
      className="form-control form-control-col"
      placeholder="Time of theft"
      value={this.state.datetime}
      onChange={value => this.setState({
        datetime: new Date(value)
      })}
      />
    </div>
    
  </div>
  
  <div className="row">
  <div className="col">
  {displayImage &&
      <img className="upload-image" src={displayImage} alt="al" />
      }
    </div>
  
  </div>
  <div className="row row-3">
    
    <div className="col col-btn-row">
    <button type="submit" className="btn btn-primary btn-row" >SUBMIT REPORT <div class="spinner-border" role="status">
  <span class="sr-only">Loading...</span> </div></button>
    </div>

    <div className="col col-btn-row">
    <div className="upload-btn-wrapper">
  <button className="btn-btn">Upload car images</button>
  <input type="file" name="myfile" accept="image/*" multiple onChange={this.handleImageUpload}/>
  
</div>
    </div> 
  </div>
</form>
</div>
</div>
    )
  }
}