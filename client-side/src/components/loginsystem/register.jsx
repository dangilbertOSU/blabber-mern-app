import Button from '../button/index';
import React, { useState } from 'react';
import './login.css';

export const Login = (props) => {

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleChange = (event) => {
    if (event.target.name === 'username') {
      setUsername(event.target.value);
    } else if (event.target.name === 'password') {
      setPassword(event.target.value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username !== '' && password.length > 3) {
      const user = { username: username, password: password };
      fetch('/api/register', {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, cors, *same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: { 'Content-Type': 'application/json' },
          redirect: 'follow', // manual, *follow, error
          referrer: 'no-referrer', // no-referrer, *client
          body: JSON.stringify(user), // body data type must match 'Content-Type' header
        }).then(res => {
          if (res.status === 200) {
            props.history.push('/login');
          } else {
            const error = new Error(res.error);
            throw error;
          }
        })
        .catch(err => {
          console.log(err);
          alert('Error registering, please try again');
        });
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    props.setFlipped(!props.flipped);
  };

  return (
    <div className="form">
      <form onSubmit={ handleSubmit }>
        <h1>Register</h1>
        <section>
          <label for="username">username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
            placeholder="username"/>
          <label for="password">password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="password"/>
        </section>
        <br/>
        <section>
          <Button type="submit" variant="primary">register</Button>
          <p>Already have an account?
            <button
              className="flipper-button"
              onClick={(e) => handleClick(e)}
            >
              click here to login.
            </button>
          </p>
        </section>
      </form>
    </div>
  );
};

export default Login;
