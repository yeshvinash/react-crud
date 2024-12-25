import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
  Table,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };
  const [student, setStudent] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    const getStudent = async () => {
      try {
        const student = await axios.get(`http://localhost:8000/students/${id}`);
        setStudent(student.data);
      } catch (error) {
        console.log("something went wrong");
      }
    };
    getStudent();
  }, [id]);

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
      await axios.put(`http://localhost:8000/students/${id}`, student);
      navigate("/");
    } catch (error) {
      console.error("Something went wrong:", error);
    }
  };
  return (
    <>
      <Container>
        <h1 className="text-center mt-2 mb-4  bg-info p-3">
          CRUD Operations with JSON Server Api
        </h1>
        <Row className="justify-content-center">
          <Col lg={8}>
            <Form className="form-wrap" onSubmit={onFormSubmit}>
              <h3 className="mb-0 bg-success text-center p-3 text-light fw-medium">
                Edit Student
              </h3>
              <div className="mt-3 px-3">
                <Row>
                  <Col>
                    <FloatingLabel
                      // controlId="floatingInput"
                      label="id"
                      className="mb-3"
                    >
                      <Form.Control
                        type="text"
                        name="id"
                        id=""
                        value={id}
                        placeholder="id"
                        disabled
                      />
                    </FloatingLabel>
                  </Col>
                  <Col>
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
                        value={student.name}
                        onChange={(e) => onHandleChange(e)}
                      />
                    </FloatingLabel>
                  </Col>
                  <Col lg={12}>
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
                        value={student.email}
                        placeholder="name@example.com"
                        onChange={(e) => onHandleChange(e)}
                      />
                    </FloatingLabel>
                  </Col>
                </Row>
                <Button
                  onSubmit={onFormSubmit}
                  type="submit"
                  className="w-100 bg-primary mb-3"
                >
                  update
                </Button>
              </div>
            </Form>
            <Button
              variant="primary text-center mx-auto d-block mt-3"
              onClick={handleClick}
            >
              back to home
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Edit;
