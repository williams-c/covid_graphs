import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ userLogin }) => {
    const [username, updateUsername] = useState('');
    const [password, updatePassword] = useState('');
    const [status, updateStatus] = useState('incomplete')

    const validatePassword = (password) => {
      const reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
      const test = reg.test(password);
      return test;
    }

    const handleSubmit = (e) => {
      e.preventDefault();

      if (!validatePassword(password)) {
        alert('Please enter a valid password')
        return
      }
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
            {status === 'error' ? <div className='invalid-username'>Username taken, please select a different username</div> : ''}
            <input onChange={(e) => {updateUsername(e.target.value)}} className='login-form-element' type="text" placeholder="Username" value={username}></input><br/>
            <input onChange={(e) => {updatePassword(e.target.value)}} className='login-form-element' type="password" placeholder="Password" value={password}></input><br/>
            <div className="pwd-txt">Passwords must be at least eight characters and contain one uppercase letter, one lowercase letter and one number</div>
            <input onClick={(e) => {handleSubmit(e)}} className='login-form-element' type="submit"></input>
            <p>Click <a>here </a>to continue as guest</p>
            <p>New User? Click <a>here</a> to sign up</p>
          </form>

        </div>

      </div>
    );
}

export default Login;
