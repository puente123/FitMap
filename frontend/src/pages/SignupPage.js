import React, { useState} from "react";
import useSignup from "../hooks/useSignup";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {signup, error, isLoading} = useSignup()


  const onSubmitClick = async (event) => {
    //without this the page would automatically reload by default
    event.preventDefault();
    await signup(email, password)
    console.log(email, password);
  };

  return (
    <form className="signup" onSubmit={onSubmitClick}>
        <h3>Sign Up</h3>
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

export default SignupPage;
