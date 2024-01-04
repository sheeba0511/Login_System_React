import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

export default function Admin() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        console.log(products);
      });
  }, []);

  return (
    <>
      <h5 className="admin_text"> Admin Page</h5>
      <div className="table_admin">
        <table striped bordered hover>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Product Image</th>
              <th>Product Price</th>
              <th>Rating</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((cv, idx) => {
              return (
                <tr key={idx}>
                  <td>
                    <p>{cv.title}</p>
                  </td>
                  <td>
                    <div className="img_products2">
                      {" "}
                      <img src={cv.images[0]} alt="Product" />
                    </div>
                  </td>
                  <td>
                    <p>{cv.price}</p>
                  </td>
                  <td>
                    <p>{cv.rating}</p>
                  </td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm me-1"
                      onClick={handleShow}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                    <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Modal Products</Modal.Title>
                      </Modal.Header>

                      <Modal.Body>
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Name of product"
                        />
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Price of product"
                        />
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Rating of product"
                        />
                      </Modal.Body>

                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                          Save Changes
                        </Button>
                      </Modal.Footer>
                    </Modal>
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
