import React, { useState } from 'react';
import axios from 'axios';

const SignUp = ({ userLogin, guest }) => {
    const [username, updateUsername] = useState('');
    const [password, updatePassword] = useState('');

    const validatePassword = (password) => {
      const reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
      const test = reg.test(password);
      return test;
    }

    const handleSubmit = (e) => {
      e.preventDefault();

      if (!validatePassword(password)) {
        updatePassword(undefined);
        return
      }
      axios({
        method: 'post',
        url: '/sign-up',
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
        updateUsername(undefined);
      })

    }

    return (
      <div>

        <div className='login-box'>

          <form className='login-form'>
            <h3>Sign Up</h3>
            {username === undefined ? <div className='invalid-username'>Username taken, please select a different username</div> : ''}
            <input onChange={(e) => {updateUsername(e.target.value)}} className='login-form-element' type="text" placeholder="Username" value={username}></input><br/>
            <input onChange={(e) => {updatePassword(e.target.value)}} className='login-form-element' type="password" placeholder="Password" value={password}></input><br/>
            {password === undefined ? <div className='invalid-username'>* Invalid Password</div> : ''}
            <div className="pwd-txt">Passwords must be at least eight characters and contain one uppercase letter, one lowercase letter and one number</div>
            <input onClick={(e) => {handleSubmit(e)}} className='login-form-element' type="submit"></input>
            <p>Click <a onClick={guest}>here </a>to continue as guest</p>
            <p>Already Registered? Click <a>here</a> to login</p>
          </form>

        </div>

      </div>
    );
}

export default SignUp;
