import React, { useEffect, useState } from "react";
import "../style.css";
import { useNavigate } from "react-router-dom";

export default function Product() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
      });
  }, []);
  let handleNextPage = () => {
    navigate("/admin");
  };

  return (
    <>
      <div className="container_fluid_product">
        <div className="product_header">
          <p></p>
          <p>
            {" "}
            <h5 className="product-heading">Product List</h5>
          </p>
          <button className="btn btn-primary" onClick={handleNextPage}>
            Go To Admin
          </button>
        </div>
        <div className="product-list">
          <div className="row">
            {products.map((item) => (
              <div className="col-md-3">
                <div className="card_product">
                  <div className="img_product">
                    <img src={item.images[0]} alt="Product" />
                  </div>
                  <p> {item.title} </p>
                  <p>Price-{item.price}</p>
                  <p> Rating-{item.rating} </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
