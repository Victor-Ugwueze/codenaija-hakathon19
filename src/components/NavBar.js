import React, {  Component  } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../firebase'
import Modal from './card/Modal';

class NavBar extends Component {

   state = {
     search: "",
     modalIsOpen: false,
     result: {},
     isLoading: false
   }
   
   handleSearchInput = (e) => {
     const { name, value} = e.target
     this.setState({
       [name]: value
     })
   }

   handleModalOpen =async (e)=>{
     e.preventDefault()
     

     if (this.state.search){
      const searchResult = await this.props.firebase.searchVehicles(this.state.search);
      this.setState({
        modalIsOpen: true,
        result: searchResult
      })
    
   }
  }

   handleCloseModal =(e)=>{
     e.preventDefault()
    this.setState({
      modalIsOpen: false 
    })
   }
  render() {
    const { modalIsOpen } = this.state
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
              <Link
                id="logout"
                className="nav-link"
                to="/home-page"
                >
                  Tracker
                </Link>
              </li>
       
              <li className="nav-item">
              <Link
                id="logout"
                className="nav-link"
                to="/check-page"
                >
                  CheckPage
                </Link>
              </li>
              <li className="nav-item">
              <Link
                id="logout"
                className="nav-link" 
                to="/login"
                >
                 Login
                </Link>
              </li>
              </ul>
              {
            window.location.pathname !== '/check-page' ? 
             (
               <>
                <form className="form-inline my-2 my-lg-0">
                  <input 
                    className="form-control mr-sm-2" type="search" 
                    placeholder="Search with VIN or Plate Number" 
                    name="search"
                    required="true"
                    onChange={this.handleSearchInput}
                    aria-label="Search" />
                  <button 
                    className="btn btn-outline-success my-2 my-sm-0" onClick={this.handleModalOpen}
                    type="submit" >
                      Search
                  </button> 
                  </form>
                </>
              )
            : null
          }
    </div>

    {modalIsOpen && <Modal handleCloseModal={this.handleCloseModal}  value={this.state.result} isLoading={this.state.isLoading}/>}
  </nav>
  </>
    )
  }
}

export default withRouter(withFirebase(NavBar));