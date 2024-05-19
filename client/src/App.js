import { AnimatePresence } from "framer-motion";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home Page/Home";
import Login from "./components/Login Page/Login";
import Register from "./components/Register Page/Register";
import Products from "./components/Products Page/Products";
import Product from "./components/Product Page/Product";
function App() {
  return (
    <AnimatePresence>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:data" element={<Product />} />
        
      </Routes>
    </AnimatePresence>
  );
}

export default App;
