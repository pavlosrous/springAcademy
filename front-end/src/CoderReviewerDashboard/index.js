import React, { useEffect, useState } from "react";
import { useLocalState } from "../util/useLocalStorage";
import ApiService from "../service/ApiService";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import NavigationBar from "../Navbar";
//TODO: MAKE ABLE FOR PROFFS TO VIEW ASSIGNMENTS AND CHANGE DUE DATES
// STUDENTS SHOULD BE ABLE TO VIEW THE ASSIGNMENTS THAT CORRESPOND TO EACH COURSE
const InstructorDashboard = () => {
  const [jwt, setJwt] = useLocalState("", "jwt"); //store a state of an object
  const [assignments, setAssignments] = useState(null);
  const [courses, setCourses] = useState(null);
  const [showModal, setShowModal] = useState(null);
  const [courseId, setCourseId] = useState(null);

  const [assignment, setAssignment] = useState({
    branch: null,
    gitUrl: null,
    number: null,
    status: null,
    dueDate: null,
  });

  function updateAssignment(property, value) {
    const newAssignment = { ...assignment }; //create duplicate of assignment object and put it in newAssignment. This is the only way to reset it
    newAssignment[property] = value;
    setAssignment(newAssignment);
  }

  useEffect(() => {
    ApiService.GetCoursesForInstructor(jwt)
      .then((response) => {
        if (response.status === 200) return response.json();
        else return Promise.reject("failed to fetch courses");
      })
      .then((courseData) => {
        console.log(courseData);
        setCourses(courseData);
      });
  }, []);

  useEffect(() => {
    console.log(courses);
  }, [courses]);

  function createAssignment(courseId) {
    ApiService.PostAssignment(assignment, courseId, jwt)
      .then((response) => {
        if (response.status === 200) return response.json();
        else return Promise.reject("failed to create assignment");
      })
      .then((assignment) => {
        // window.location.href = `/api/assignments/${assignment.id}`;
      });
  }

  return (
    <Container>
      {/*{showModal ? (*/}

      {/*) : (*/}
      {/*  <></>*/}
      {/*)}*/}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Assignment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="number">
              <Form.Label>Assignment #</Form.Label>
              <Form.Control
                type="number"
                placeholder="1"
                autoFocus
                onChange={(e) => {
                  updateAssignment("number", e.target.value);
                  console.log(courseId);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="dueDate">
              <Form.Label>Assignment #</Form.Label>
              <Form.Control
                type="date"
                placeholder="2022-12-22"
                autoFocus
                onChange={(e) => updateAssignment("dueDate", e.target.value)}
                // value={assignment.dueDate}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              createAssignment(courseId);
              setShowModal(false);
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Row>
        <Col>
          <br />
          <h1>My Courses</h1>
        </Col>
      </Row>
      <Card>
        <Card.Header>
          <h3>Computer Science courses</h3>
        </Card.Header>
        <Card.Body>
          <div className="mb-3">
            {courses ? (
              <div
                className="d-grid gap-5"
                style={{ gridTemplateColumns: "repeat(auto-fill, 20rem)" }}
              >
                {courses.map((course) => (
                  <Card
                    key={course.id}
                    style={{ width: "20rem", height: "17rem" }}
                  >
                    <Card.Body className="d-flex flex-column justify-content-around">
                      <Card.Title>
                        {course.department} - {course.number}
                      </Card.Title>

                      <Card.Text style={{ marginTop: "0.5rem" }}>
                        <p>
                          <b>Name</b>: {course.name}
                        </p>
                        <p>Instructor: {course.instructor}</p>

                        <p>Credits: {course.credits}</p>
                      </Card.Text>
                      <div className="d-flex gap-2 justify-content-around">
                        <Button
                          variant="secondary"
                          size="md"
                          // onClick={() => {
                          //   window.location.href = `/api/cs/courses/${course.id}`;
                          // }}
                          onClick={() => {
                            setShowModal(true);
                            setCourseId(course.id);
                          }}
                        >
                          Add Assignment
                        </Button>
                        <Button
                          variant="secondary"
                          size="md"
                          // onClick={() => {
                          //   window.location.href = `/api/cs/courses/${course.id}`;
                          // }}
                          onClick={() => {
                            window.location.href = `/api/cs/courses/${course.id}/assignments`;
                          }}
                        >
                          Edit Assignments
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            ) : (
              <></>
            )}
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default InstructorDashboard;
