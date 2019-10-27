import React from 'react'
import { Link } from 'react-router-dom';

const HomePage = () => {
  console.log(window.location.pathname)
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
                  HomePage
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
                to="/login"
                >
                  <a className="nav-link" href="#">Login</a>
                </Link>
              </li>
              </ul>
              {
            window.location.pathname != '/login' ? 
             (
               <>
                <form className="form-inline my-2 my-lg-0">
                  <input 
                    className="form-control mr-sm-2" type="search" 
                    placeholder="Search" 
                    aria-label="Search" />
                  <button 
                    className="btn btn-outline-success my-2 my-sm-0" 
                    type="submit">
                      Search
                  </button> 
                  </form>
                </>
              )
            : null
          }
    </div>
  </nav>
  </>
  )
}

export default HomePage;