import React, { useState } from "react";

const Register = ({ toggleToLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Retrieve the existing users list from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if the email is already registered
    const isUserExists = users.some((user) => user.email === email);
    if (isUserExists) {
      alert("This email is already registered. Please log in.");
      toggleToLogin(); // Navigate to the login page
      return;
    }

    // Add the new user to the list
    const newUser = { email, password };
    users.push(newUser);

    // Save the updated users list to localStorage
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful! Please log in.");
    toggleToLogin(); // Navigate to the login page
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
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
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account?{" "}
        <button onClick={toggleToLogin} className="toggle-button">
          Login
        </button>
      </p>
    </div>
  );
};

export default Register;