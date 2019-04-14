
import React from "react";

const Login = ({ username, password, email, onChange, onLogin, onRegister }) => (
    <div>

        <label> Username: </label>
        <input value={username}
            onChange={e => onChange("username", e.target.value)} />
        <br />

        <label> Password: </label>
        <input value={password}
            onChange={e => onChange("password", e.target.value)} />
        <br />

        <label> Email: </label>
        <input value={email}
            onChange={e => onChange("email", e.target.value)} />
        <br />

        <button onClick={onLogin}> Login </button>
        <button onClick={onRegister}> Register </button>
    </div>
);

export default Login;