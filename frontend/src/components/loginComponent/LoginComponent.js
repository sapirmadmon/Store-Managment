import "./loginComponent.css";
import { useState } from "react";
import { observer } from "mobx-react-lite";
import axios from "axios";
import { useNavigate } from "react-router";

function LoginComponent({ store }) {
  let navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const verifyUser = async () => {
    try {
      const res = await axios.post(`http://localhost:3000/auth/login`, {
        username: username,
        password: password,
      });
      const data = await res.data;
      store.setAccessToken(data);
      store.setRoleOfeUser(data.role);

      if (store.access_token) {
        navigate("/products");
      }
    } catch (error) {
      alert("User is not registered!");
      console.log(error);
    }
  };

  return (
    <div className="loginWrapper">
      <h1 className="loginTitle">Login</h1>
      <input
        className="loginInput"
        type="text"
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <br />
      <input
        className="loginInput"
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <br />
      <button className="loginButton" onClick={verifyUser}>
        Login
      </button>
    </div>
  );
}

export default observer(LoginComponent);
