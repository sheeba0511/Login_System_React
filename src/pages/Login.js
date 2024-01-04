//1 Import area

import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import "../style.css";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//2 function definition area
export default function Login() {
  //2.1 hook area
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["token"]);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  //2.2 function definition
  let handleSubmit = (username, password) => {
    let data = {
      // username: "kminchelle",
      // password: "0lelplR",
      username: username,
      password: password,
    };
    fetch(`https://dummyjson.com/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.token) {
          setCookie("token", data.token);
          toast('Logged In Successfully');
          navigate("/product");
        }
        else{
          toast(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //return area
  return (
    <>
      <div className="container_login">
        <div className="login-card">
          <h5 className="login-heading">Login</h5>
          <Form className="outer_div">
            <Form.Group className="form-group" controlId="formBasictext">
              <Form.Label className="label">Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Name" className="input" onChange={(e) => setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group className="form-group" controlId="formBasicPassword">
              <Form.Label className="label">Password</Form.Label>
              <Form.Control type="password" placeholder="Password" className="input" onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Button
              className="btn_login"
              onClick={() => {
                handleSubmit(username, password);
              }}
            >
              Login
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
}
