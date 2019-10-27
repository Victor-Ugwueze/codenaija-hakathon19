import React, { Component } from 'react'
import ModalCommon from './ModalCommon';
export default class Modal extends Component {
  render() {

    const {handleCloseModal, value} = this.props
    return (

     
      <div>
        {value === null ? <ModalCommon handleCloseModal={handleCloseModal} content="No Record Found"/> :
        <ModalCommon handleCloseModal={handleCloseModal} content={`${value && value.reported ? 'Car found, Reported !': 'Car found, Not reported'}`}/>
      }
      </div>
    )
  }
}


