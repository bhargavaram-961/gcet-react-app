import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import Products from './Components/Products';
import Login from './Components/Login';

function App() {
  return (
    <BrowserRouter>
      <header>
        <h1>ECommerce: By Tarun</h1>
        <nav>
          <Link to="/" style={{ marginRight:'10px' }}>Home</Link>
          <Link to="/products" style={{ marginRight:'10px' }}>Products</Link>
          <Link to="/login">Login</Link>
        </nav>
        <hr />
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>

      <footer>
        <hr />
        <h1>Footer</h1>
      </footer>
    </BrowserRouter>
  );
}

export default App;