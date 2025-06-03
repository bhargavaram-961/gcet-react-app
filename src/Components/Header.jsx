import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../App";

export default function Header() {
  const { user } = useContext(AppContext);
  return (
    <header>
      <h1>My Online Shop</h1>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <span className="nav-separator">-</span>
        <Link to="/cart">Cart</Link>
        <span className="nav-separator">-</span>
        {user.token ? (
          <Link to="/logout">Logout</Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
      <hr />
    </header>
  );
}