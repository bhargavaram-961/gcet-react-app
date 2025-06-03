import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";

export default function Login() {
  const { setUser } = useContext(AppContext);
  const [loginData, setLoginData] = useState({
    email: "",
    pass: ""
  });
  const [msg, setMsg] = useState();
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL || "http://localhost:8080";

  const handleSubmit = async () => {
    if (!loginData.email || !loginData.pass) {
      setMsg("Please fill in all fields");
      return;
    }

    setLoading(true);
    setMsg("");

    try {
      console.log("Attempting login with:", { email: loginData.email }); 
      
      const response = await fetch(`${API}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData)
      });

      const data = await response.json();
      console.log("Login response:", data);

      if (response.ok && data.user && data.token) {
        setMsg("Welcome " + data.user.name);
        setUser(data.user);
        Navigate("/");
      } else {
        setMsg(data.error || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMsg("Network error. Please check if the server is running.");
    } finally {
      setLoading(false);
    }
  };

  const goToRegister = () => {
    Navigate("/register");
  };

  return (
    <main>
      <div className="form-container fade-in">
        <h3>Login</h3>
        {msg && (
          <div className={`message ${msg.includes('Welcome') ? 'success' : 'error'}`}>
            {msg}
          </div>
        )}
        <div className="form-group">
          <input
            type="email"
            placeholder="Email address"
            value={loginData.email}
            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={loginData.pass}
            onChange={(e) => setLoginData({ ...loginData, pass: e.target.value })}
            required
          />
        </div>
        <button 
          className="btn btn-primary btn-block" 
          onClick={handleSubmit}
          disabled={loading || !loginData.email || !loginData.pass}
        >
          {loading ? "Logging in..." : "Submit"}
        </button>
        <button className="btn btn-secondary btn-block" onClick={goToRegister}>
          Create Account
        </button>
      </div>
    </main>
  );
}