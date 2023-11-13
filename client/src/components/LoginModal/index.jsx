/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import { FallingLines } from 'react-loader-spinner';
import './index.css'

function LoginModal({ setShowModal }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');


    const [showSignup, setShowSignup] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [showLogin, setShowLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const errorText = useRef(null);
    const emailInputEl = useRef(null);

    useEffect(() => {
        emailInputEl.current.focus()
    }, [showSignup, showForgotPassword, showLogin, emailInputEl])

    function resetFormFields() {
        setEmail('');
        setPassword('');
        setUsername('');
    }

    function showSignupHandler() {
        setShowLogin(false);
        setShowForgotPassword(false);
        setShowSignup(true);
        resetFormFields()
    }

    function showLoginHandler() {
        setShowLogin(true);
        setShowForgotPassword(false);
        setShowSignup(false);
        resetFormFields()
    }
    function showForgotPasswordHandler() {
        setShowLogin(false);
        setShowForgotPassword(true);
        setShowSignup(false);
        resetFormFields()
    }


    async function signupHandler(e) {
        e.preventDefault();
        if (isLoading) return;
        setIsLoading(true)
        try {
            const data = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    password,
                    username
                })
            })

            const response = await data.json();
            if (response.error) {
                errorText.current.innerHTML = response.error
                setIsLoading(false)
            } else {
                window.location.reload();
            }
        } catch (err) {
            console.log('error sign up user ', err)
        }
    }

    async function loginHandler(e) {
        e.preventDefault();
        if (isLoading) return;
        setIsLoading(true)

        try {
            const rawData = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    password
                })
            })

            const response = await rawData.json();
            if (response.error) {
                errorText.current.innerHTML = response.error;
                setIsLoading(false)
            } else {
                window.location.reload();
            }
        } catch (err) {
            console.log('error sign up user ', err)
        }
    }

    async function forgotPasswordHandler(e) {
        e.preventDefault();
        if (isLoading) return;
        setIsLoading(true)

        try {
            const data = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    password,
                    username
                })
            })

            const response = data.json();
            if (response.error) {
                errorText.current.innerHTML = response.error;
                setIsLoading(false)
            }
            window.location.reload();
        } catch (err) {
            console.log('error', err)
        }
    }

    return (
        <div onClick={() => setShowModal(false)} className="modal-container">
            <div onClick={(e) => e.stopPropagation()} className="modal">
                {/* Login Section */}
                {showLogin &&
                    <>
                        <h3 className="modal-title">Login</h3>
                        <form className="login-form" onSubmit={(e) => loginHandler(e)}>
                            <input
                                type="email"
                                ref={emailInputEl}
                                placeholder="email"
                                onChange={(e) => { setEmail(e.target.value); errorText.current.innerHTML = ''; }}
                                minLength={3}
                            />
                            <input
                                type="password"
                                placeholder="password"
                                onChange={(e) => { setPassword(e.target.value); errorText.current.innerHTML = ''; }}
                                minLength={8}
                            />

                            <p className="error-text" ref={errorText}></p>

                            {isLoading ?
                                <p className="loading-icon">
                                    <FallingLines
                                        color="#FFCD00"
                                        width="50"
                                        visible={true}
                                        ariaLabel='falling-lines-loading'
                                    />
                                </p>
                                :
                                <button type="submit">Login</button>
                            }
                        </form>
                        <p className="login-option-text">Not a member?
                            <span onClick={showSignupHandler}> Sign up</span>
                        </p>
                        <p className="login-option-text">Forgot
                            <span onClick={showForgotPasswordHandler}> Password?</span>
                        </p>
                    </>
                }

                {/* Signup Section */}
                {showSignup &&
                    <>
                        <h3 className="modal-title">Sign up</h3>
                        <form className="login-form" onSubmit={(e) => signupHandler(e)}>
                            <input
                                type="email"
                                ref={emailInputEl}
                                placeholder="email"
                                onChange={(e) => { setEmail(e.target.value); errorText.current.innerHTML = ''; }}

                            />
                            <input
                                type="text"
                                placeholder="username"
                                onChange={(e) => { setUsername(e.target.value); errorText.current.innerHTML = ''; }}
                                minLength={3}
                            />
                            <input
                                type="password"
                                placeholder="password"
                                minLength={8}
                                onChange={(e) => { setPassword(e.target.value); errorText.current.innerHTML = ''; }}
                            />

                            <p className="error-text" ref={errorText}></p>

                            {isLoading ?
                                <p className="loading-icon">
                                    <FallingLines
                                        color="#FFCD00"
                                        width="50"
                                        visible={true}
                                        ariaLabel='falling-lines-loading'
                                    />
                                </p>
                                :
                                <button type="submit">Sign up</button>
                            }
                        </form>
                        <p className="login-option-text">Already a member?
                            <span onClick={showLoginHandler}> Login</span>
                        </p>
                        <p className="login-option-text">Forgot
                            <span onClick={showForgotPasswordHandler}> Password?</span>
                        </p>
                    </>
                }
                {showForgotPassword &&
                    <>
                        <h3 className="modal-title">Forgot Password?</h3>
                        <form className="login-form" onSubmit={(e) => forgotPasswordHandler(e)}>
                            <input
                                type="email"
                                ref={emailInputEl}
                                placeholder="email"
                                onChange={(e) => { setEmail(e.target.value); errorText.current.innerHTML = ''; }}
                            />

                            <p className="error-text" ref={errorText}></p>

                            {isLoading ?
                                <p className="loading-icon">
                                    <FallingLines
                                        color="#FFCD00"
                                        width="50"
                                        visible={true}
                                        ariaLabel='falling-lines-loading'
                                    />
                                </p>
                                :
                                <button type="submit">Reset</button>
                            }
                        </form>
                        <p className="login-option-text">Or <br /> <br />
                            <span onClick={showLoginHandler}>Sign in</span>
                        </p>

                    </>
                }
            </div>
        </div>
    )
}

export default LoginModal;