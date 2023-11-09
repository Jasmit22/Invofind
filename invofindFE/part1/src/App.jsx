import { useState, useEffect } from "react";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";

import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const invofindHeading = document.querySelector(".invofindHeading");
    if (invofindHeading) {
      invofindHeading.innerHTML = invofindHeading.innerText
        .split("")
        .map(
          (letters, i) =>
            `<span style = "transition-delay:${i * 30}ms;
          filter: hue-rotate(${i * 15}deg)"›$">${letters}</span>`
        )
        .join("");
    }
  }, []);

  const handleLogin = async (event) => {
    // event.preventDefault();
    // try {
    //   const user = await loginService.login({
    //     username,
    //     password,
    //   });
    //   blogService.setToken(user.token);
    //   window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
    //   setUser(user);
    //   setUsername("");
    //   setPassword("");
    // } catch (exception) {
    //   setErrorMessage(exception.response.data.error);
    //   setTimeout(() => {
    //     setErrorMessage(null);
    //   }, 4000);
    //   console.log(exception);
    // }
  };

  const renderLogin = () => {
    return (
      <div>
        <Togglable buttonLabel="Log In">
          <LoginForm
            handleSubmit={handleLogin}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            username={username}
            password={password}
          />
        </Togglable>
      </div>
    );
  };

  const renderLogout = () => {
    return (
      <div className="logOut">
        <button onClick={() => {}}>Log out</button>
      </div>
    );
  };

  return (
    <div>
      <div className="banner">
        <div className="invofindHeading">InvoFind 🔍</div>
        {user !== null && renderLogout()}
      </div>
      <div className="content">{user === null && renderLogin()}</div>
    </div>
  );
}

export default App;
