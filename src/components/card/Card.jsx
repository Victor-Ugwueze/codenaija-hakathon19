import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ title, description, image }) => {
  return (
    <div className="card" style={{width: '18rem'}}>
      <img src={image} className="card-img-top" alt="title" />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <Link to="/" className="btn btn-primary">
          View Report
        </Link>
      </div>
    </div>
  );
};

export default Card;
