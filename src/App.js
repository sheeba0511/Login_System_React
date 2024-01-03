import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import RequireAuth from "./pages/RequireAuth";

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
    </>
  );
}

export default App;
