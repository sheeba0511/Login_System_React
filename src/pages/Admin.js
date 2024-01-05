import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Admin() {
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [productObject, setProductObject] = useState({});
  const navigate = useNavigate();

  function handleClose(type) {
    if (type === "edit") {
      setShowEdit(false);
    } else {
      setShowDelete(false);
    }
  }
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getListOfProducts();
  }, []);

  function getListOfProducts() {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
      });
  }

  function openEditModal(item, type) {
    if (type === "edit") {
      setShowEdit(true);
    } else {
      setShowDelete(true);
    }
    setProductObject(item);
  }

  const handleInputChange = (fieldName, value) => {
    if (["price", "rating", "discountPercentage"].includes(fieldName)) {
      value = Number(value);
    }
    setProductObject((prevProductObject) => ({
      ...prevProductObject,
      [fieldName]: value,
    }));
  };

  function saveChanges(type) {
    if (type === "edit") {
      setShowEdit(false);
      fetch(`https://dummyjson.com/products/${productObject.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productObject),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.id) {
            toast("Product details updated successfully");
            getListOfProducts();
          } else {
            toast(data.message);
          }
        });
    } else {
      setShowDelete(false);
      fetch(`https://dummyjson.com/products/${productObject.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productObject),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.id) {
            toast(`${productObject.title} is deleted from product list`);
            getListOfProducts();
          } else {
            toast(data.message);
          }
        });
    }
  }
  let handlePreviousPage = () => {
    navigate("/product");
  };

  return (
    <>
      <div className="container_fluid_admin">
        <div className="product_header">
          <p></p>
          <p>
            {" "}
            <h5 className="admin_text"> Admin Page</h5>
          </p>
          <button className="btn btn-primary" onClick={handlePreviousPage}>
            Go To Product
          </button>
        </div>
        <div className="table_admin">
          <table>
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
                        title="Edit Details of Product"
                        onClick={() => {
                          openEditModal(cv, "edit");
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm me-1"
                        title="Delete Product"
                        onClick={() => {
                          openEditModal(cv, "delete");
                        }}
                      >
                        Delete
                      </button>
                      <Modal show={showEdit} onHide={() => handleClose("edit")}>
                        <div className="modal_card">
                          <Modal.Header closeButton className="product_text">
                            <Modal.Title>Edit Product Details</Modal.Title>
                          </Modal.Header>

                          <Modal.Body className="product_text">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Name of product"
                              value={productObject.title}
                              onChange={(e) =>
                                handleInputChange("title", e.target.value)
                              }
                            />
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Description"
                              title={productObject.description}
                              value={productObject.description}
                              onChange={(e) =>
                                handleInputChange("description", e.target.value)
                              }
                            />
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Price of product"
                              value={productObject.price}
                              onChange={(e) =>
                                handleInputChange("price", e.target.value)
                              }
                            />
                            <Form.Label>Discount Percentage</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Discount Percentage"
                              value={productObject.discountPercentage}
                              onChange={(e) =>
                                handleInputChange(
                                  "discountPercentage",
                                  e.target.value
                                )
                              }
                            />
                            <Form.Label>Rating</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Rating of product"
                              value={productObject.rating}
                              onChange={(e) =>
                                handleInputChange("rating", e.target.value)
                              }
                            />
                          </Modal.Body>

                          <Modal.Footer className="product_text">
                            <Button
                              variant="secondary"
                              onClick={() => handleClose("edit")}
                            >
                              Close
                            </Button>
                            <Button
                              variant="primary"
                              onClick={() => saveChanges("edit")}
                            >
                              Save Changes
                            </Button>
                          </Modal.Footer>
                        </div>
                      </Modal>

                      <Modal
                        show={showDelete}
                        onHide={() => handleClose("delete")}
                      >
                        <div className="modal_del">
                          <Modal.Header closeButton className="product_text">
                            <Modal.Title>Delete Products</Modal.Title>
                          </Modal.Header>

                          <Modal.Body className="product_text">
                            <p>
                              Are you sure you want to delete this product ?
                            </p>
                          </Modal.Body>

                          <Modal.Footer className="product_text">
                            <Button
                              variant="secondary"
                              onClick={() => handleClose("delete")}
                            >
                              Close
                            </Button>
                            <Button
                              variant="danger"
                              onClick={() => saveChanges("delete")}
                            >
                              Delete
                            </Button>
                          </Modal.Footer>
                        </div>
                      </Modal>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
