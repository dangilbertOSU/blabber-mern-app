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
    console.log('called');
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
    <form class="form" onSubmit={ handleSubmit }>
      <section>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleChange}
          placeholder="username"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          placeholder="password"
        />
      </section>
      <br/>
      <section>
        <Button type="submit" variant="primary">Login</Button>
        <p>Don't have an account? <a href="/register">click here to register</a></p>
      </section>
    </form>
  );
};

export default userGetterSetter(Login);
