import { useState } from "react";
import LoginOut from "./componets/Loginout/";
import Form from "./componets/Form/";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleLogin = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <div>
      {token ? (
        <Form token={token} onLogout={handleLogout} />
      ) : (
        <LoginOut onLoginSuccess={handleLogin} />
      )}
    </div>
  );
}

export default App;