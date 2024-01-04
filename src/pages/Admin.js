import React, { useEffect, useState } from "react";

export default function Admin() {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        // setProduct(data.allProducts);
        console.log(product);
      });
  }, []);
  return (
    <>
      <h1> Admin Page</h1>
      <div className="table_admin">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>image</th>
              <th>Price</th>
              <th>Rating</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {product.map((cv, idx) => {
              return (
                <tr key={idx}>
                  <td>{cv.title}</td>
                  <td>{cv.img}</td>
                  <td>{cv.price}</td>
                  <td>{cv.rating}</td>
                  <td>
                    <button className="btn btn-primary">Edit</button>
                    <button className="btn btn-danger">Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
