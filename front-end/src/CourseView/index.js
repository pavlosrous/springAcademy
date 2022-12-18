import React, { useEffect, useState } from "react";
import { useLocalState } from "../util/useLocalStorage";
import {
  Badge,
  Col,
  Container,
  Row,
  Form,
  Button,
  ButtonGroup,
  DropdownButton,
  Dropdown,
  Alert,
} from "react-bootstrap";
import ApiService from "../service/ApiService";

const CourseView = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const courseId = window.location.href.split("/courses/")[1];
  const [course, setCourse] = useState({
    credits: null,
    finalDate: null,
    name: null,
    instructor: null,
    department: null,
    number: null,
  });
  const [instructors, setInstructors] = useState([]);
  const [nameError, setNameError] = useState(false);
  const [numberError, setNumberError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [courseSubmitted, setCourseSubmitted] = useState(false);

  /**
   * Updates the property of the assignment object with the specific value
   * @param property property to update
   * @param value new value of the property
   */
  function updateCourse(property, value) {
    const newCourse = { ...course }; //create duplicate of assignment object and put it in newAssignment. This is the only way to reset it
    newCourse[property] = value;
    setCourse(newCourse);
  }

  function saveCourse() {
    if (course.name === null) {
      setNameError(true);
      setTimeout(() => {
        setNameError(false);
      }, 7000);
    } else if (course.number === null) {
      setNumberError(true);
      setTimeout(() => {
        setNumberError(false);
      }, 7000);
    } else if (course.finalDate === null) {
      setDateError(true);
      setTimeout(() => {
        setDateError(false);
      }, 7000);
    } else {
      setCourseSubmitted(true);
      setTimeout(() => {
        setCourseSubmitted(false);
      }, 7000);
      ApiService.UpdateCourse(courseId, course, jwt)
        .then((response) => {
          if (response.status === 200) return response.json();
          else return Promise.reject("failed to update course");
        })
        .then((courseData) => {
          setCourse(courseData);
        });
    }
  }

  useEffect(() => {
    ApiService.GetInstructors(jwt)
      .then((response) => {
        if (response.status === 200) return response.json();
        else return Promise.reject("failed to get instructors");
      })
      .then((instructorsResponse) => {
        setInstructors(instructorsResponse);
      });
  }, []);

  useEffect(() => {
    ApiService.GetCourse(courseId, jwt)
      .then((response) => {
        if (response.status === 200) return response.json();
        else return Promise.reject("failed to get course with id " + courseId);
      })
      .then((coursesResponse) => {
        console.log(coursesResponse);
        setCourse(coursesResponse);
      });
  }, []);

  return (
    <Container className="mt-5">
      {nameError ? (
        <Alert key="danger" variant="danger">
          Please include a course name
        </Alert>
      ) : (
        <></>
      )}
      {numberError ? (
        <Alert key="danger" variant="danger">
          Please include a course number
        </Alert>
      ) : (
        <></>
      )}
      {dateError ? (
        <Alert key="danger" variant="danger">
          Please include a date for the final exam
        </Alert>
      ) : (
        <></>
      )}
      {courseSubmitted ? (
        <Alert key="success" variant="success">
          Course submitted successfully
        </Alert>
      ) : (
        <></>
      )}
      <Row className="d-flex align-items-center">
        <Col>
          {course.number ? (
            <h1>
              {course.department}-{course.number}
            </h1>
          ) : (
            <h1>Edit Course</h1>
          )}
        </Col>
        <Col></Col>
      </Row>

      {course ? (
        <>
          <Form.Group as={Row} className="my-3" controlId="assignmentName">
            <Form.Label column sm="3" md="2">
              Course Name
            </Form.Label>
            <Col sm="9" md="8" lg="6">
              <Form.Control
                type="name"
                placeholder="Data Structures & Algorithms"
                onChange={(e) => updateCourse("name", e.target.value)}
                value={course.name}
              />
            </Col>
            <Col sm="9" md="8" lg="6"></Col>
          </Form.Group>
          <Form.Group as={Row} className="my-3" controlId="assignmentName">
            <Form.Label column sm="3" md="2">
              Number
            </Form.Label>
            <Col sm="9" md="8" lg="6">
              <Form.Control
                type="number"
                min="100"
                max="600"
                placeholder="107"
                onChange={(e) => updateCourse("number", e.target.value)}
                value={course.number}
              />
            </Col>
            <Col sm="9" md="8" lg="6"></Col>
          </Form.Group>

          <Form.Group as={Row} className="my-3" controlId="gitUrl">
            <Form.Label column sm="3" md="2">
              Date of Final
            </Form.Label>
            <Col sm="9" md="8" lg="6">
              <Form.Control
                type="date"
                placeholder=""
                onChange={(e) => updateCourse("finalDate", e.target.value)}
                value={course.finalDate}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="branch">
            <Form.Label column sm="3" md="2">
              Credits
            </Form.Label>
            <Col sm="9" md="8" lg="6">
              <Form.Control
                type="number"
                placeholder="1"
                min="1"
                max="4"
                onChange={(e) => updateCourse("credits", e.target.value)}
                value={course.credits}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="branch">
            <Form.Label column sm="3" md="2">
              Instructor
            </Form.Label>
            <Col sm="9" md="8" lg="6">
              <DropdownButton
                onSelect={(selectedElement) => {
                  updateCourse("instructor", selectedElement);
                }}
                as={ButtonGroup}
                variant="info"
                title={
                  course.instructor
                    ? `${course.instructor}`
                    : "Select an Instructor"
                }
              >
                {instructors.map((instructor) => (
                  <Dropdown.Item
                    eventKey={instructor.username}
                    key={instructor.username}
                  >
                    {instructor.username}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </Col>
          </Form.Group>
          <div className="d-flex gap-5">
            <Button size="lg" onClick={() => saveCourse()}>
              Submit
            </Button>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => (window.location.href = "/dashboard")}
            >
              Back
            </Button>
          </div>
        </>
      ) : (
        <></>
      )}
    </Container>
  );
};
export default CourseView;
