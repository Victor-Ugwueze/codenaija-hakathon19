import React, { Component, Fragment } from 'react'
import "../styles/homepage.css"

export default class HomePage extends Component {

  state = {
    plate_number: "",
    vin: "",
    license: "",
    location: "",
    time: ""
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
  render() {
    return (
<Fragment>
     
<div className="header-title">
<h1>Report your stolen car</h1>
      </div>
  <form className="homepage-form" onSubmit={this.onSubmit}>
 
  <div className="row row-1">
    <div className="col">
      <input type="text" className="form-control form-control-col" name="plate_number" onChange={this.handleInputChange} placeholder="Enter your plate number"/>
    </div>
    <div className="col">
      <input type="text" className="form-control form-control-col" name="vin"placeholder="Enter VIN" onChange={this.handleInputChange}/>
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
      <input type="text" className="form-control form-control-col time-of-theft" name="time" placeholder="Time of theft" onChange={this.handleInputChange}/>
    </div>
  </div>
  
  <div className="row row-3">
    
    <div className="col col-btn-row">
    <button type="submit" className="btn btn-primary btn-row" >REPORT</button>
    </div>
  </div>
</form>
</Fragment>
    )
  }
}
