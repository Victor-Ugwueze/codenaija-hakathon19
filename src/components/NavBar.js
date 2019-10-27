import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../firebase'

const HomePage = (props) => {
  const { location: { pathname }, history } = props;
  const [search, setSearch] = useState('');

  const searchCar = (event) => {
    event.preventDefault();
   if(search.length > 5) {
    history.push('/check-page', {
      search
    });
   }
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          Navbar
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link id="logout" to="/home-page">
                <a className="nav-link" href="#">
                  Home <span className="sr-only">(current)</span>
                </a>
              </Link>
            </li>

            <li className="nav-item">
              <Link id="logout" to="/check-page">
                <a className="nav-link" href="#">
                  CheckPage
                </a>
              </Link>
            </li>
          </ul>
         {pathname !== '/check-page' && <form className="form-inline my-2 my-lg-0" onSubmit={searchCar}>
            <input
              className="form-control mr-sm-2"
              type="search"
              onChange={e => setSearch(e.target.value)}
              value={search}
              placeholder="Search with VIN or Plate Number"
              aria-label="Search"
            />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
              Search
            </button>
          </form>
         }
        </div>
      </nav>
    </>
  );
};

export default withRouter(withFirebase(HomePage));
