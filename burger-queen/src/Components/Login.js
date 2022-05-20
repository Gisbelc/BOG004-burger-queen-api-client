import React, { useState } from "react";
import "./Login.css";
import logo from "../img/logoburger.png";

export function UserLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = "http://localhost:8080/login";
    const data = { 
      email: username,
      password: password
   };

    fetch(url, {
      method: "POST", // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => console.log("Success:", response));
  };

  return (
    <div className="div-login">
      <div className="div-logo">
        <img src={logo} alt="Logo BQ" className="logo-img" />
      </div>

      <form className="form-login" onSubmit={handleSubmit}>
        <h1>Iniciar Sesión</h1>

        <input
          className="email"
          placeholder="Ingresa tu correo electronico"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="password"
          type="password"
          placeholder="Ingresa tu contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn-login">INGRESAR</button>
      </form>
    </div>
  );
}
