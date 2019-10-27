import React, { useState } from 'react';
import { withFirebase } from '../firebase';
import withAuth from '../hoc/Auth'
import Image from '../Image/Group.svg';
import Search from '../Image/search.svg'
import Good from '../Image//good.svg';

const CheckPage = (props) => {
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});
  const [display, setDisplay] = useState({ show: false})

  const searchVehicle = async () => {
    setIsLoading(true);
    const searchResult = await props.firebase.searchVehicles(search);
    console.log(searchResult, 'searchResult')
    if(searchResult) {
      setData(searchResult)
      setDisplay({...display,  show: false });
    }else {
      setDisplay({...display,  show: true });
    }
    setIsLoading(false);
  }

  const removeAlert = () => {
    setDisplay({...display,  show: false })
  }

  const alert = () => {
    return (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>Car not found</strong>
          <button 
            type="button" 
            className="close" 
            data-dismiss="alert" 
            aria-label="Close"
            onClick={removeAlert}
            >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
    )
  }

  return (
    <div className="check-center">
       {display.show ? alert() : null}
      {isLoading
       ? (<div className="lds-hourglass"></div>)
       : (<div className="group-item">
         {
           data.plate_number &&
           <div className="jumbotron size">
           <img 
             src={data.reported ? Image : Good} 
             className='image-size' 
             alt='Search Icon' 
             />
           <h3 className="text">{data.reported ? 'REPORTED' : ''}</h3>
         </div>
         }
          <div className="search-container">
          <div className="search_icon search__body">
            <input 
            className="input-field"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by plate number or VIN" 
            />
             <img 
              src={Search} 
              className='search-size' 
              alt='Search Icon' 
              onClick={searchVehicle}
            />
           </div>
          {
            data.plate_number &&
            <div>
            <div className="arrge">
                <span 
                  className="text-arrangement plate-number">{data.plate_number}</span>
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
                    Plate:
                    </span>
                   <span>{data.plate_number}</span>
                </span>
                <span>
                <span 
                    className="text-arrangement"
                    style={{ marginRight: '12%' }}
                    >
                    year:
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
                   <span>{data.VIN}</span>
                </span>
            </div>
       </div>
          }
        </div>
      </div>)
      }
    </div>
  )
}

export default withAuth(withFirebase(CheckPage));