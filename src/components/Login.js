import { useState, useEffect } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      <h2 className="text-center mt-3">Welcome back.</h2>
      <div className="form-wrapper">
        <form className="signup-form" onSubmit={onSubmitForm}>
          <div className="signup-form-wrapper">
            <div className="signup-form-element-wrapper">
              <div>
                <label for="username">Username</label>
                <input
                  type="text"
                  // placeholder=" Add a Tweet"
                  // value={text}
                  // onChange={(e) => setText(e.target.value)}
                  maxLength={255}
                  size={100}
                  className="form-control"
                  id="username"
                ></input>
              </div>
            </div>

            <div className="signup-form-element-wrapper">
              <div>
                <label for="pass1">Password</label>
                <input
                  type="password"
                  // placeholder=" Add a Tweet"
                  // value={text}
                  // onChange={(e) => setText(e.target.value)}
                  maxLength={255}
                  size={100}
                  className="form-control"
                  id="pass1"
                ></input>
              </div>
            </div>

            <input
              type="submit"
              // placeholder=" Add a Tweet"
              value="Log in"
              // onChange={(e) => setText(e.target.value)}
              className="signup-form-button btn btn-primary"
            ></input>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
