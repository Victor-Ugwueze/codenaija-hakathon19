import React, { useState } from 'react';
import { withFirebase } from '../firebase';

const Login = (props) => {
  props.firebase.auth.onAuthStateChanged((user) => {
    if (user) {
      props.history.push('/check-page');
      return;
    }
  });
  const [inputValue, setValues] = useState(
    {
      email: '',
      password: ''
    }
  );
  const [isLoading, setIsLoading] = useState(false)



  const [display, setDisplay] = useState({ show: false, message: 'Field cannot be empty!!' })
  
  const handleInput = (e) => {
    const { name, value } = e.target
    setValues({...inputValue, [name]: value })
  }

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if(inputValue.email === '') {
      setDisplay({...display,  show: true })
      setIsLoading(false);
    }

    if(inputValue.password === '') {
      setDisplay({...display,  show: true })
      setIsLoading(false);
    }

    if(inputValue.password && inputValue.email !== '') {
      try {
        const result = await props.firebase.auth.signInWithEmailAndPassword(inputValue.email, inputValue.password);
        console.log(result);
      } catch (error) {
        setDisplay({...display,  show: true, message: 'Incorrect email or password' })
        setIsLoading(false);
        return;
      }
      setIsLoading(false);

      props.history.push('/check-page')
    }
  }

  const removeAlert = () => {
    setDisplay({...display,  show: false })
  }

  const alert = () => {
    return (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>{display.message}</strong>
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
      <button disabled={`${isLoading ? 'disabled' : ''}`} type="submit" className="btn btn-primary">
        Submit
        {isLoading &&  <div className="spinner-border" role="status">
          <span class="sr-only">Loading...</span> </div> }
      </button>
    </form>
    </div>
    </div>
  )
}


export default withFirebase(Login);