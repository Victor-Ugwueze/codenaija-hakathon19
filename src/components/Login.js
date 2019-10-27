import React, { useState } from 'react';
import { history } from 'react-router-dom';

const Login = (props) => {
  const [inputValue, setValues] = useState(
    {
      email: '',
      password: ''
    }
  ) 

  const [display, setDisplay] = useState({ show: false})
  
  const handleInput = (e) => {
    const { name, value } = e.target
    setValues({...inputValue, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(inputValue.email === '') {
      setDisplay({...display,  show: true })
    }
    
    if(inputValue.password === '') {
      setDisplay({...display,  show: true })
    }

    if(inputValue.password && inputValue.email !== '') {
      props.history.push('/check-page')
    }
  }

  const removeAlert = () => {
    setDisplay({...display,  show: false })
  }

  const alert = () => {
    return (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>Field cannot be empty!!</strong>
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
    <div className="check-center" style={{ width: '25%'}}>
    <h3 className="login">Login Page</h3>
    {display.show ? alert() : null}
    <div className="boxer">
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label 
          htmlFor="exampleInputEmail1">
            Email address
          </label>
        <input 
          type="email" 
          className="form-control" 
          id="exampleInputEmail1" 
          aria-describedby="emailHelp" 
          placeholder="Enter email" 
          value={inputValue.email}
          name="email"
          onChange={handleInput} 
          />
        <small 
          id="emailHelp" 
          className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
      </div>
      <div 
        className="form-group">
        <label 
          htmlFor="exampleInputPassword1">
            Password
        </label>
        <input 
          type="password" 
          className="form-control" 
          id="exampleInputPassword1" 
          placeholder="Password" 
          name="password"
          value={inputValue.password}
          onChange={handleInput} 
        />
      </div>
      <div 
        className="form-group">
        <span 
          htmlFor="exampleInputPassword1"
          style={{ color: 'blue'}}
          >
            Forget Password ? 
        </span>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    </div>
    </div>
  )
}


export default Login;