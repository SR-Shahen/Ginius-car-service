import { createUserWithEmailAndPassword, getAuth, GithubAuthProvider, GoogleAuthProvider, sendEmailVerification, signInWithPopup, signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import app from '../../firebase.init';

const auth = getAuth(app)
const SignUp = () => {
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('');
    const Navigate = useNavigate();

    const handelGoogleSignin = () => {
        sendEmailVerification(auth.currentUser)
            .then(() => {
                console.log("email sent")
            })

        signInWithPopup(auth, GoogleAuthProvider)
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
        signInWithPopup(auth, GithubAuthProvider)
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
    const handelConfirmPasswordBlur = event => {

        setConfirmPassword(event.target.value);
        console.log(event.target.value);
    }

    if (user) {
        Navigate('/product')
    }
    const handelFromSubmit = event => {
        event.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                const user = userCredential.user;
                setUser(user)
            })
            .catch(error => {
                setError(error)
                console.log(error)
            })
        if (password !== confirmPassword) {
            setError('your two password is not match')
            return;
        }
    }
    return (
        <div>
            <h1>Sign Up</h1>
            <div className='form-container'>
                <form onSubmit={handelFromSubmit}>
                    <label className='label-title' htmlFor="email">Email</label>
                    <input onBlur={handelEmailBlur} type="email" name="email" required />
                    <br /><br />
                    <label className='label-title' htmlFor="password">Password</label>
                    <input onBlur={handelPasswordBlur} type="password" name="password" required />
                    <br /><br />
                    <label className='label-title' htmlFor="confirmPassword">Confirm Password</label>
                    <input onBlur={handelConfirmPasswordBlur} type="password" name="confirmPassword" required />
                    <br /><br />
                    <input className='submit-btn' type="submit" value="Sign Up" />
                </form>
                <h2>{error.message}</h2>
                <p>Already have an account?<Link to='/login'>Login</Link></p>

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
                <p>Email{user.email}</p>
            </div>
        </div>
    );
};

export default SignUp;