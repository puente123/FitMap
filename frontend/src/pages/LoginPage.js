import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {login, error, isLoading} = useLogin()

  const onSubmitClick = async (event) => {
    //without this the page would automatically reload by default
    event.preventDefault();
    await login(email, password)
    console.log(email, password);
  };

  return (
    <form className="login" onSubmit={onSubmitClick}>
      <h3>Log In</h3>

      <label htmlFor="email">Input Email</label>
      <br />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <label htmlFor="password">Input Password</label>
      <br />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button disabled={isLoading}>Submit!</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default LoginPage;
