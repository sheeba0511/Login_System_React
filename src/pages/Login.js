//1 Import area

import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import "../style.css";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

//2 function definition area
export default function Login() {
  //2.1 hook area
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["token"]);
  //2.2 function definition
  let handleSubmit = () => {
    //window.alert("Sucessfully Login");
    let data = {
      username: "kminchelle",
      password: "0lelplR",
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
          navigate("/product");
        }

        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //return area
  return (
    <>
      <div className="container_login">
        <div className="outer_div">
          {/* <h5 className="log-text">Login</h5> */}
          <Form>
            <Form.Group className="mb-3" controlId="formBasictext">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button
              className="btn_login"
              // type="submit"
              onClick={() => {
                handleSubmit();
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
{
  /* <div className="login-contents">
        <div className="login-cards">
          <form autocomplete="off">
            <div className="login-texts">
              <h5 className="log-text">Login</h5>
              <div className="login-inputs">
                <input
                  type="text"
                  placeholder="Email"
                  formControlName="userName"
                />
                <i className="fa fa-envelope-o"></i>
              </div>
              <div className="login-inputs">
                <input
                  type="password"
                  placeholder="Password"
                  formControlName="password"
                />
                <i class="fa fa-unlock-alt"></i>
              </div>
              <button className="login-button">Login</button>
            </div>
          </form>
        </div>
      </div> */
}
