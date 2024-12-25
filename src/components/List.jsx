import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Tooltip, OverlayTrigger } from "react-bootstrap";
import { Link } from "react-router-dom";

const List = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudentList = async () => {
      try {
        const students = await axios.get("http://localhost:8000/students");
        setStudents(students.data);
      } catch (error) {
        console.log("something wrong");
      }
    };
    fetchStudentList();
  }, []);

  // for tooltip
  const showDetails = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      view
    </Tooltip>
  );
  const editDetails = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Edit
    </Tooltip>
  );
  const deleteDetails = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Delete
    </Tooltip>
  );
  // For delete operations
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8000/students/${id}`);
    var newRecord = students.filter((item) => {
      console.log(item);
      return item.id !== id;
    });
    setStudents(newRecord);
  };

  return (
    <>
      <h3 className="mb-0 bg-warning text-center p-3 text-light fw-medium">
        Student List
      </h3>
      <Table responsive className="studentlist-table-wrap">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((item, i) => {
            return (
              <tr key={i}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>
                  <span className="actions-wrap d-flex">
                    <OverlayTrigger placement="bottom" overlay={showDetails}>
                      <Link to={`/view/${item.id}`} className="me-2">
                        <i className="ri-eye-fill"></i>
                      </Link>
                    </OverlayTrigger>
                    <OverlayTrigger placement="bottom" overlay={editDetails}>
                      <Link to={`/edit/${item.id}`} className="me-2">
                        <i className="ri-pencil-fill"></i>
                      </Link>
                    </OverlayTrigger>
                    <OverlayTrigger placement="bottom" overlay={deleteDetails}>
                      <Link to="/" onClick={() => handleDelete(item.id)}>
                        <i className="ri-delete-bin-6-fill"></i>
                      </Link>
                    </OverlayTrigger>
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default List;
