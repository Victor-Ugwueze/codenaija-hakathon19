import React from 'react';
import Image from '../Image/Group.svg';
import Search from '../Image/search.svg'
import Good from '../Image//good.svg';

const CheckPage = () => {

  const data = {
    plateNumber: 'EKY57FJ',
    color: 'Black',
    make: 'Honda',
    year: '2015',
    vin: 'VI274HSAIUUIEW'
  };

  const result ={
    reported: true
  }

  return (
    <div className="check-center">
        <div className="group-item">
          <div className="jumbotron size">
          <img 
            src={result.reported ? Image : Good} 
            className='image-size' 
            alt='Search Icon' 
            />
          <h3 className="text">{result.reported ? 'REPORTED' : ''}</h3>
          </div>
          <div className="search-container">
          <div className="search_icon search__body">
            <input 
            className="input-field"
              placeholder="Search by plate number or VIN" 
            />
             <img 
              src={Search} 
              className='search-size' 
              alt='Search Icon' 
            />
           </div>
           <div>
                <div className="arrge">
                    <span 
                      className="text-arrangement plate-number">{data.plateNumber}</span>
                    <span>
                      <span 
                        className="text-arrangement"
                        style={{ marginRight: '8%' }}
                        >
                        Color:
                        </span>
                       <span>{data.color}</span>
                    </span>
                    <span>
                    <span 
                        className="text-arrangement"
                        style={{ marginRight: '8%' }}
                        >
                        Make:
                        </span>
                       <span>{data.make}</span>
                    </span>
                    <span>
                    <span 
                        className="text-arrangement"
                        style={{ marginRight: '12%' }}
                        >
                        Year:
                        </span>
                       <span>{data.year}</span>
                    </span>
                    <span>
                    <span 
                        className="text-arrangement"
                        style={{ marginRight: '17%' }}
                        >
                        Vin:
                        </span>
                       <span>{data.vin}</span>
                    </span>
                </div>
           </div>
        </div>
      </div>
    </div>
  )
}

export default CheckPage;