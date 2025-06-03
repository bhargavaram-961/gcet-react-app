import React, { useState } from "react";
import { AppContext } from "../App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { users, setUsers } = useContext(AppContext);
  const [user, setUser] = useState({
    name: "",
    email: "",
    pass: ""
  });
  const [msg, setMsg] = useState();
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL || "http://localhost:8080";
  const handleSubmit = async () => {
    if (!user.name || !user.email || !user.pass) {
      setMsg("Please fill in all fields");
      return;
    }
    setLoading(true);
    setMsg("");
    try {
      console.log("Attempting registration with:", { 
        name: user.name, 
        email: user.email 
      });
      const response = await fetch(`${API}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
      });

      const data = await response.json();
      console.log("Registration response:", data);

      if (response.ok) {
        setMsg("Registration successful! Redirecting to login...");
        setUsers(prev => [...prev, user]);
        setUser({ name: "", email: "", pass: "" });
        setTimeout(() => {
          Navigate("/login");
        }, 1500);
      } else {
        setMsg(data.error || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setMsg("Network error. Please check if the server is running on port 8080.");
    } finally {
      setLoading(false);
    }
  };

  const goToLogin = () => {
    Navigate("/login");
  };

  return (
    <main>
      <div className="form-container fade-in">
        <h3>Register</h3>
        {msg && (
          <div className={`message ${msg.includes('successful') ? 'success' : 'error'}`}>
            {msg}
          </div>
        )}
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email address"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="New Password"
            value={user.pass}
            onChange={(e) => setUser({ ...user, pass: e.target.value })}
            required
          />
        </div>
        <button 
          className="btn btn-primary btn-block" 
          onClick={handleSubmit}
          disabled={loading || !user.name || !user.email || !user.pass}
        >
          {loading ? "Registering..." : "Submit"}
        </button>
        <button className="btn btn-secondary btn-block" onClick={goToLogin}>
          Already have an account? Login
        </button>

        {users && users.length > 0 && (
          <div className="user-list">
            <h4>Registered Users:</h4>
            <ul style={{listStyle: 'none', padding: 0}}>
              {users.map((value, index) => (
                <li key={index} className="user-item">
                  {value.name} - {value.email}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}