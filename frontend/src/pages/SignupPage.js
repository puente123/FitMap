import React, { useState} from "react";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitClick = async (event) => {
    //without this the page would automatically reload by default
    event.preventDefault();

    console.log(email, password);
  };

  return (
    <form className="signup" onSubmit={onSubmitClick}>
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
      <button>Submit!</button>
    </form>
  );
};

export default SignupPage;
