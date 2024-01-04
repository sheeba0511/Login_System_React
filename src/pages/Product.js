import React, { useEffect, useState } from "react";
import "../style.css";

export default function Product() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
      });
  }, []);

  return (
    <>
      <div className="container_fluid_product">
        <h5 className="product-heading">Product List</h5>
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
