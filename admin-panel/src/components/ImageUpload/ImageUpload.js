import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form, Table, Modal, Row, Col } from "react-bootstrap";
import { FaUpload, FaTrash, FaEye, FaEdit } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import "./ImageUpload.css";

const ImageUpload = () => {
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState(null);
  // const [showImages, setShowImages] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [editingImage, setEditingImage] = useState(null);

  const categories = ["All", "Wines", "Cocktails", "Hot Coffee", "Cold Coffee", "Pizzas", "Burgers", "Sandwiches", "French Fries", "Chinese", "Cakes", "Ice Creams"];

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get("http://localhost:4000/photos");
      setImages(response.data.data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileNameWithoutExt = file.name.replace(/\.[^/.]+$/, "");
      setTitle(fileNameWithoutExt);
      setImageFile(file);
    }
  };

  const handleEdit = (image) => {
    setTitle(image.title);
    setImageFile(null);
    setSelectedCategory(image.category);
    setEditingImage(image);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", selectedCategory);
      
      if (imageFile) {
        formData.append("image", imageFile);
      }

      if (editingImage) {
        toast.success("Image updated successfully!");
      } else {
        toast.success("Image uploaded successfully!");
      }

      fetchImages();
      setShowModal(false);
      setEditingImage(null);
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Error uploading image!");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this image?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:4000/photos/${id}`);
        fetchImages();
        toast.success("Image deleted successfully!");
      } catch (error) {
        console.error("Error deleting image:", error);
        toast.error("Error deleting image!");
      }
    }
  };

  const handleViewImage = (url) => {
    window.open(url, "_blank");
  };

  const filteredImages = images.filter((image) => {
    const matchesSearchTerm = image.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "" || selectedCategory === "All" || image.category === selectedCategory;
    return matchesSearchTerm && matchesCategory;
  });

  return (
    <div>
      <ToastContainer />
      <h2>Image Upload</h2>
      <Button variant="primary" onClick={() => { setShowModal(true); setEditingImage(null); }}>
        <FaUpload /> Upload Image
      </Button>

      <>
        <Row className="mb-3 mt-3">
          <Col md={6}>
            <Form.Control
              type="text"
              placeholder="Search by title"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
          <Col md={6}>
            <Form.Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>

        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>Title</th>
              <th>Image</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredImages.map((image) => (
              <tr key={image._id}>
                <td>{image.title}</td>
                <td>
                  <img src={image.url} alt={image.title} style={{ width: "100px" }} />
                </td>
                <td>{image.category}</td>
                <td>
                <Button variant="outline-dark" style={{ border: "1px solid black" }} onClick={() => handleViewImage(image.url)}>
  <FaEye /> View
</Button>

                  <Button variant="outline-primary" onClick={() => handleEdit(image)}>
                    <FaEdit /> Edit
                  </Button>
                  <Button variant="outline-danger" onClick={() => handleDelete(image._id)}>
                    <FaTrash /> Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingImage ? "Edit Image" : "Upload Image"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} required={!editingImage} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                required
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <div className="text-end">
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                <FaUpload /> {editingImage ? "Update Image" : "Upload Image"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ImageUpload;
