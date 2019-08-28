import Button from '../button/index';
import React, { useState } from 'react';
import userGetterSetter from '../userGetterSetter/index';
import './login.css';

export const Login = (props) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (event) => {
    if (event.target.name === 'username') {
      setUsername(event.target.value);
    } else if (event.target.name === 'password') {
      setPassword(event.target.value);
    }
  };

  const setUserName = (username) => {
    props.setUser(username);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (username !== '' && password.length > 3) {
      const user = { username: username, password: password };
      await fetch('/api/authenticate', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        if (res.status === 200) {
          setUserName(username);
          window.location.href = '/';
          props.history.push('/');
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch(err => {
        console.log(err);
        alert('Error logging in please try again');
      });
    }
  };

  return (
    <div className="form">
      <form onSubmit={ handleSubmit }>
        <h1>login</h1>
        <section>
          <label for="username">username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
            placeholder="type your username"
          />
          <label for="password">password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="type your password"
          />
          <a href="/forgotpasssword" className="forgot-password">forgot password?</a>
        </section>
        <br/>
        <section>
          <Button type="submit" variant="primary">login</Button>
          <p>Don't have an account? <a href="/register">click here to register</a></p>
          <br/>
        </section>
      </form>
    </div>
  );
};

export default userGetterSetter(Login);
