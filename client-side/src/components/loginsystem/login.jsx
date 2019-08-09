import React, { useState } from 'react';
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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username !== '' && password.length > 3) {
      const user = { username: username, password: password };
      fetch('/api/login', {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, cors, *same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: { 'Content-Type': 'application/json' },
          redirect: 'follow', // manual, *follow, error
          referrer: 'no-referrer', // no-referrer, *client
          body: JSON.stringify(user), // body data type must match "Content-Type" header
        }).then((res) => {
        if (res.status === 200) {
          props.setLogin(true);
        }
      })
      .then((data) => data)
      .catch((err)=> err);
    }
  };

  return (
    <form onSubmit={ handleSubmit }>
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
        <button type="submit" className="PrimaryButton">Login</button>
        {/*<p>Don't have an account? <a href="/register">click here to register</a></p>*/}
      </section>
    </form>
  );
};

export default Login;
