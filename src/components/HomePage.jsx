import React, { Component } from 'react'

export default class HomePage extends Component {
  render() {
    return (
      <div className="container">
        <div className="section">
        <div className="">
        <input type="text" name="" id="" placeholder="Enter plate number"/>
        <input type="text" name="" id="" placeholder="Enter VIN"/>
        <input type="text" name="" id="" placeholder="Drivers License"/>
        </div>
       <div>
       <input type="text" name="" id="" placeholder="Enter last seen location"/>
        <input type="text" name="" id="" placeholder="Time of theft"/>
       </div>
       <div>
        <button type="submit">Report</button>
        </div>
       
        </div>
      </div>
    )
  }
}
