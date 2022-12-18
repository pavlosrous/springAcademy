import React, { useEffect, useRef, useState } from "react";
import ApiService from "../service/ApiService";
import { useLocalState } from "../util/useLocalStorage";
import {
  Badge,
  Button,
  ButtonGroup,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  Row,
} from "react-bootstrap";

const AssignmentView = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  // const assignmentId = window.location.href.split("/assignments/")[1];
  const courseId = window.location.href
    .split("/courses/")[1]
    .split("/assignments")[0];

  const [assignment, setAssignment] = useState({
    id: null,
    dueDate: "",
    number: null,
    status: null,
    branch: null,
    gitUrl: null,
    dateSubmitted: null,
    grade: null,
  });
  const [assignmentEnums, setAssignmentEnums] = useState([]);
  const [assignmentStatuses, setAssignmentStatuses] = useState([]);
  const [courseAssignments, setCourseAssignments] = useState([]);

  function findAssignmentBasedOnNumber(number) {
    courseAssignments.forEach((assignment) => {
      if (assignment.number == number) {
        // getAssignment(assignment.id);
        getAssignment(assignment.number);
      }
    });
  }

  function submitAssignment() {
    ApiService.SubmitAssignment(courseId, assignment, jwt)
      .then((response) => {
        if (response.status === 200) return response.json();
        else return Promise.reject("failed to submit assignment");
      })
      .then((assignmentData) => {
        setAssignment(assignmentData);
      });
  }

  /**
   * Updates the property of the assignment object with the specific value
   * @param property property to update
   * @param value new value of the property
   */
  function updateAssignment(property, value) {
    const newAssignment = { ...assignment }; //create duplicate of assignment object and put it in newAssignment. This is the only way to reset it
    newAssignment[property] = value;
    setAssignment(newAssignment);
  }

  function save(assignment) {
    ApiService.UpdateAssignment(assignment.id, assignment, jwt)
      .then((response) => {
        if (response.status === 200) return response.json();
        else return Promise.reject("could not update assignment");
      })
      .then((assignmentData) => {
        setAssignment(assignmentData);
      });
  }

  useEffect(() => {
    ApiService.GetAssignmentsByCourse(courseId, jwt)
      .then((response) => {
        if (response.status === 200) return response.json();
        else return Promise.reject("cannot fetch assignments for course");
      })
      .then((assignmentResponse) => {
        setAssignmentStatuses(assignmentResponse.statusEnum);
        setCourseAssignments(assignmentResponse.assignments);
      });
  }, []);

  function getAssignment(assignmentNumber) {
    ApiService.GetAssignment(assignmentNumber, courseId, jwt)
      .then((response) => {
        if (response.status === 200) return response.json();
        else return Promise.reject("Invalid login attempt");
      })
      .then((assignmentResponse) => {
        setAssignment(assignmentResponse);
      });
  }

  return (
    <Container className="mt-5">
      <Row className="d-flex align-items-center">
        <Col>
          {assignment.number ? <h1>Assignment {assignment.number}</h1> : ""}
        </Col>
        <Col>
          <Badge pill bg="info" style={{ fontSize: "1rem" }}>
            {assignment.status}
          </Badge>{" "}
        </Col>
      </Row>

      {assignment ? (
        <>
          <Form.Group as={Row} className="my-3" controlId="assignmentName">
            <Form.Label column sm="3" md="2">
              Assignment #
            </Form.Label>
            <Col sm="9" md="8" lg="6">
              <DropdownButton
                onSelect={(selectedElement) => {
                  findAssignmentBasedOnNumber(selectedElement);
                }}
                as={ButtonGroup}
                variant="info"
                title={
                  assignment.number
                    ? `Assignment ${assignment.number}`
                    : "Select an Assignment"
                }
              >
                {courseAssignments.map((assignment) => (
                  <Dropdown.Item
                    eventKey={assignment.number}
                    key={assignment.number}
                  >
                    {assignment.number}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="my-3" controlId="gitUrl">
            <Form.Label column sm="3" md="2">
              Due Date
            </Form.Label>
            <Col sm="9" md="8" lg="6">
              <Badge bg="warning" text="dark">
                {assignment.dueDate ? assignment.dueDate : "To be determined"}
              </Badge>{" "}
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="my-3" controlId="gitUrl">
            <Form.Label column sm="3" md="2">
              Grade
            </Form.Label>
            <Col sm="9" md="8" lg="6">
              <Badge bg="success" text="dark">
                {assignment.grade ? assignment.grade : "N/A"}
              </Badge>{" "}
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="my-3" controlId="gitUrl">
            <Form.Label column sm="3" md="2">
              Date Submitted
            </Form.Label>
            <Col sm="9" md="8" lg="6">
              <Badge bg="success" text="dark">
                {assignment.dateSubmitted ? assignment.dateSubmitted : "N/A"}
              </Badge>{" "}
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="my-3" controlId="gitUrl">
            <Form.Label column sm="3" md="2">
              GitHub URL
            </Form.Label>
            <Col sm="9" md="8" lg="6">
              <Form.Control
                type="url"
                placeholder="http://github.com/username/reponame"
                onChange={(e) => updateAssignment("gitUrl", e.target.value)}
                value={assignment.gitUrl}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="branch">
            <Form.Label column sm="3" md="2">
              Branch
            </Form.Label>
            <Col sm="9" md="8" lg="6">
              <Form.Control
                type="text"
                placeholder="example_branch"
                onChange={(e) => {
                  updateAssignment("branch", e.target.value);
                  console.log(assignment);
                }}
                value={assignment.branch}
              />
            </Col>
          </Form.Group>
          <div className="d-flex gap-5">
            {assignment.status === "Pending Submission" ? (
              <Button
                size="lg"
                onClick={() => {
                  submitAssignment();
                }}
              >
                Submit
              </Button>
            ) : (
              <Button
                size="lg"
                onClick={() => {
                  save(assignment);
                }}
              >
                Update
              </Button>
            )}

            <Button
              size="lg"
              variant="secondary"
              onClick={() => {
                window.location.href = "/dashboard";
              }}
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

export default AssignmentView;
//TODO: CHANGE THE SRC CODE TO DISPLAY ONLY THE ASSIGNMENTS
