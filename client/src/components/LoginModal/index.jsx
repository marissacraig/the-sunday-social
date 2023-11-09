import { useState } from "react";

function Login() {

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [username, setUsername] = useState(null);


    





    return (
        <form>
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
    )
}

export default Login;