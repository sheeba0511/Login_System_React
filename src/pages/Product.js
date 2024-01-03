import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import "../style.css";

export default function Product() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        console.log(products);
      });
  }, []);

  // const navigate = useNavigate();
  // function submit() {
  //   navigate("/");
  // }

  return (
    <>
      <div className="container_fluid_product">
        <div className="row">
          {products.map((item) => (
            <div className="col-sm">
              <div className="card_product">
                <div className="img_product">
                  <img src={item.images[0]} alt="image" />
                </div>
                <p> {item.title} </p>
                <p>Price-{item.price}</p>
                <p> Rating-{item.rating} </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <button onClick={submit}>Go To login</button> */}
    </>
  );
}
