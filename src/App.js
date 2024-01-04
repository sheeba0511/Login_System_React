import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import RequireAuth from "./pages/RequireAuth";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route element={<RequireAuth />}>
            <Route path="/product" element={<Product />}></Route>
            <Route path="/admin" element={<Admin />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer theme="dark" />
    </>
  );
}

export default App;
