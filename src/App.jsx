import { createContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Cart from "./Components/Cart";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Login from "./Components/Login";
import Logout from "./Components/Logout";
import Products from "./Components/Products";
import Register from "./Components/Register";
export const AppContext = createContext();
function App() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  return (
    <div>
      <AppContext.Provider value={{ users, setUsers, user, setUser }}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route index element={<Products />} />
            <Route path="/" element={<Products />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/logout" element={<Logout />}></Route>
            <Route path="/register" element={<Register />}></Route>
          </Routes>
          <Footer />
        </BrowserRouter>
      </AppContext.Provider>
    </div>
  );
}
export default App;