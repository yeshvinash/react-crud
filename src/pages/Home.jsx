import React, { useState } from "react";
import {
  Col,
  Row,
  Container,
  Form,
  FloatingLabel,
  Button,
} from "react-bootstrap";
import List from "../components/List";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [student, setStudent] = useState({
    name: "",
    email: "",
  });

  const [status, setStatus] = useState(false);
  const navigate = useNavigate();

  const onHandleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
    console.log(student);
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8000/students`,
        student
      );
      if (response.status === 201) {
        setStatus(true);
        navigate("/"); // Navigate to the homepage or desired route
      } else {
        console.error("Failed to add student:", response);
      }
    } catch (error) {
      console.error("Something went wrong:", error);
    }
  };

  if (status) {
    return <Home />;
  }

  return (
    <>
      <Container>
        <h1 className="text-center mt-2 mb-4 bg-info p-3">
          CRUD Operations with JSON Server API
        </h1>
        <Row className="g-5">
          <Col lg={12}>
            <Form
              className="form-wrap"
              onSubmit={onFormSubmit}
              autoComplete="off"
            >
              <h3 className="mb-0 bg-success text-center p-3 text-light fw-medium">
                Add Student
              </h3>
              <div className="mt-3 px-3">
                <FloatingLabel
                  // controlId="floatingInput"
                  label="Name"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    name="name"
                    id="name"
                    placeholder="john"
                    required
                    onChange={onHandleChange}
                  />
                </FloatingLabel>
                <FloatingLabel
                  // controlId="floatingInput"
                  label="Email address"
                  className="mb-3"
                >
                  <Form.Control
                    type="email"
                    name="email"
                    id="email"
                    required
                    placeholder="name@example.com"
                    onChange={onHandleChange}
                  />
                </FloatingLabel>
                <Button
                  type="submit"
                  className="w-100 bg-primary mb-3"
                  onSubmit={onFormSubmit}
                >
                  Add
                </Button>
              </div>
            </Form>
          </Col>
          <Col lg={12}>
            <List />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
