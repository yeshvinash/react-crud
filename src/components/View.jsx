import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

const View = () => {
  const [student, setStudent] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

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

  const handleClick = () => {
    navigate("/");
  };
  return (
    <>
      <Container>
        <h3 className="mb-0 bg-info text-center p-3 text-light fw-medium">
          Student List
        </h3>
        <Table responsive className="studentlist-table-wrap">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
            </tr>
          </tbody>
        </Table>
        <Button
          variant="primary text-center mx-auto d-block"
          onClick={handleClick}
        >
          back to home
        </Button>
      </Container>
    </>
  );
};

export default View;
