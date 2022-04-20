import { getAuth, GithubAuthProvider, GoogleAuthProvider, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import app from '../../firebase.init';
import './Login.css'
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const Login = () => {
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [error, setError] = useState('');

    const handelGoogleSignin = () => {
        sendEmailVerification(auth.currentUser)
            .then(() => {
                console.log("email sent")
            })

        signInWithPopup(auth, googleProvider)
            .then(result => {
                const user = result.user;
                setUser(user);
                console.log(user);
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handelGithubSignin = () => {
        signInWithPopup(auth, githubProvider)
            .then(result => {
                const user = result.user;
                setUser(user)
                console.log(user);
            })
            .catch(error => {
                console.error(error);
            })
    }

    const handelSignout = () => {
        signOut(auth)
            .then(() => {
                setUser('')
            })
            .catch(error => {

            })
    }

    const handelEmailBlur = event => {
        setEmail(event.target.value);
        console.log(event.target.value);

    }
    const handelPasswordBlur = event => {
        setPassword(event.target.value);
        console.log(event.target.value);
    }
    const handelFromSubmit = event => {
        event.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                const user = userCredential.user;
                setUser(user)
            })
            .catch(error => {
                setError(error)
                console.log(error)
            })
    }
    return (
        <div>
            <h1>Welcome to login page</h1>
            <div className='form-container'>
                <form onSubmit={handelFromSubmit}>
                    <label className='label-title' htmlFor="email">Email</label>
                    <input onBlur={handelEmailBlur} type="email" name="email" required />
                    <br /><br />
                    <label className='label-title' htmlFor="password">Password</label>
                    <input onBlur={handelPasswordBlur} type="password" name="password" required />
                    <br /><br />
                    <input className='submit-btn' type="submit" value="login" />
                </form>
                <h2>{error.message}</h2>
                <p>New member?<Link to='/signup'>Create an account</Link></p>

            </div>

            <div>
                <h4>-------or--------</h4>
                {user.uid ? <button className='provider-sign' onClick={handelSignout}>Sign out</button> : <>
                    <button className='provider-sign' onClick={handelGoogleSignin}>Google Signin</button>
                    <button className='provider-sign' onClick={handelGithubSignin}>Github Signin</button>
                </>}
                <br />
                <img src={user.photoURL} alt="" />
                <h3>Name{user.displayName}</h3>
                <p>EmailA{user.email}</p>
            </div>
        </div>
    );
};
export default Login;