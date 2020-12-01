import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ userLogin, signUp , guest}) => {
    const [username, updateUsername] = useState('');
    const [password, updatePassword] = useState('');
    const [status, updateStatus] = useState('incomplete')

    const handleSubmit = (e) => {
      e.preventDefault();

      axios({
        method: 'post',
        url: '/login',
        data: {
          username: username,
          password: password,
        }
      })
      .then((data) => {
        userLogin()
      })
      .catch((err) => {
        console.log(err)
        updateStatus('error')
      })

    }

    return (
      <div>

        <div className='login-box'>

          <form className='login-form'>
            <h3>Login</h3>
            {status === 'error' ? <div className='invalid-username'>Invalid Username or Password</div> : ''}
            <input onChange={(e) => {updateUsername(e.target.value)}} className='login-form-element' type="text" placeholder="Username" value={username}></input><br/>
            <input onChange={(e) => {updatePassword(e.target.value)}} className='login-form-element' type="password" placeholder="Password" value={password}></input><br/>
            <input onClick={(e) => {handleSubmit(e)}} className='login-form-element' type="submit"></input>
            <p>Click <a onClick={guest}>here </a>to continue as guest</p>
            <p>New User? Click <a onClick={signUp}>here</a> to sign up</p>
          </form>

        </div>

      </div>
    );
}

export default Login;
