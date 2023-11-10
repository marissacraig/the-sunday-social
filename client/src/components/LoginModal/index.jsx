/* eslint-disable react/prop-types */
import { useState } from "react";

function LoginModal({ setShowModal }) {

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [username, setUsername] = useState(null);

    async function signupHandler(e) {
        e.preventDefault();
        try {
            await fetch('/api/user/signup', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email,
                    password,
                    username
                })
            })
            window.location.reload();
        } catch (err) {
            console.log('error sign up user ', err)
        }
    }

    return (
        <div onClick={() => setShowModal(false)} className="modal-container">
            <div onClick={(e) => e.stopPropagation()} className="modal">
                <form onSubmit={(e) => signupHandler(e)}>
                    <input
                        type="text"
                        placeholder="username"
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <input
                        type="email"
                        placeholder="email"
                        onChange={(e) => setEmail(e.target.value)}

                    />

                    <input
                        type="password"
                        placeholder="password"
                        onChange={(e) => setPassword(e.target.value)}

                    />

                    <button
                        type="submit"
                    >Login</button>
                </form>
            </div>
        </div>
    )
}

export default LoginModal;