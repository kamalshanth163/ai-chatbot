import React, { useState } from "react";

const Login = ({ onLogin, toggleToRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Retrieve the users list from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Validate the user credentials
    const isValidUser = users.some(
      (user) => user.email === email && user.password === password
    );

    if (isValidUser) {
      onLogin(); // Call the onLogin function to navigate to the app
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account?{" "}
        <button onClick={toggleToRegister} className="toggle-button">
          Register
        </button>
      </p>
    </div>
  );
};

export default Login;