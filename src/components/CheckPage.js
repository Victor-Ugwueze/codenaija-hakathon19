import React from 'react';
import Image from '../Image/Group.svg';
import Search from '../Image/search.svg'

const CheckPage = () => {

  const data = [{
    plateNumber: 'EKY57FJ',
    color: 'Black',
    make: 'Honda',
    year: '2015',
    vin: 'VI274HSAIUUIEW'
  }]

  const Display = (value) => {
    return (
      <span>{value}</span>
    )
  }

  return (
    <div className="check-center">
        <div className="group-item">
          <div className="jumbotron size">
          <img 
            src={Image} 
            className='image-size' 
            alt='Search Icon' 
            />
          <h3 className="text">STOLEN</h3>
          </div>
          <div className="search-container">
          <div className="search-icon">
            <input 
              className="form-control mr-sm-2 input-search" type="search" 
              placeholder="Search by plate number or VIN" 
              aria-label="Search" 
            />
            <img 
              src={Search} 
              className='search-size' 
              alt='Search Icon' 
            />
           </div>
           <div>
             {
               data.map((value) => {
                 return (
                   <div style={{ width: '160%'}}>
                    <div className="arrge">
                    <span  
                      className="text-arrangement">
                      {value.plateNumber}
                    </span>
                    </div>
                    <div className="arrge">
                    <span 
                        className="text-arrangement">
                        Color:</span>
                        {Display(value.color)
                      }
                    </div>
                    <div className="arrge">
                    <span 
                      className="text-arrangement">
                      Make:</span>
                      {Display(value.make)
                      }
                    </div>
                    <div className="arrge">
                    <span 
                      className="text-arrangement">
                      Year:</span>
                      {Display(value.year)
                      }
                    </div>
                    <div className="arrge">
                    <span 
                      className="text-arrangement">
                      VIN:</span>
                      {Display(value.vin)
                      }
                    </div>
                  </div>
                )
               } )
             }
           </div>
        </div>
      </div>
    </div>
  )
}

export default CheckPage;