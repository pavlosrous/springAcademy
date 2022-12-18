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

const AssignmentViewReviewer = () => {
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
  });
  const [assignmentEnums, setAssignmentEnums] = useState([]);
  const [assignmentStatuses, setAssignmentStatuses] = useState([]);
  const [courseAssignments, setCourseAssignments] = useState([]);
  const [submissionNumber, setSubmissionNumber] = useState(0);

  // holds the previous state of the assignment
  const prevAssignmentVal = useRef(assignment);

  function findAssignmentBasedOnNumber(number) {
    courseAssignments.forEach((assignment) => {
      if (assignment.number == number) {
        getAssignment(assignment.number);
      }
    });
  }

  function submitAssignment() {
    if (assignment.status === assignmentStatuses[0].status) {
      updateAssignment("status", assignmentStatuses[1].status);
    }

    ApiService.SubmitAssignment(courseId, assignment, jwt)
      .then((response) => {
        if (response.status === 200) return response.json();
        else return Promise.reject("failed to submit assignment");
      })
      .then((assignmentData) => {
        console.log(assignmentData);
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

  //
  // function saveAssignment() {
  //   //initial status is pending submission
  //   if (assignment.status === assignmentStatuses[0].status) {
  //     updateAssignment("status", assignmentStatuses[1].status);
  //   } else {
  //     save();
  //   }
  // }

  function save(assignment) {
    ApiService.UpdateAssignmentDueDate(courseId, assignment, jwt)
      .then((response) => {
        if (response.status === 200) return response.json();
        else return Promise.reject("could not update assignment");
      })
      .then((assignmentData) => {
        setAssignment(assignmentData);
      });
  }

  // //
  // useEffect(() => {
  //   //if the current and previous status not equal, update the backend
  //   // if (prevAssignmentVal.current.status !== assignment.status) {
  //   //   save();
  //   // }
  //   prevAssignmentVal.current = assignment;
  // }, [assignment]);

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
        console.log(assignmentResponse);
        setAssignment(null);
        setAssignment(assignmentResponse);
      });

    ApiService.GetNumberOfSubmissions(assignmentNumber, courseId, jwt)
      .then((response) => {
        if (response.status === 200) return response.json();
        else return Promise.reject("Invalid login attempt");
      })
      .then((submissionNumber) => {
        console.log(submissionNumber);
        setSubmissionNumber(submissionNumber);
      });
  }

  return (
    <Container className="mt-5">
      <Row className="d-flex align-items-center">
        <Col>
          {assignment.number ? <h1>Assignment {assignment.number}</h1> : ""}
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
          <Form.Group as={Row} className="my-3" controlId="dueDate">
            <Form.Label column sm="3" md="2">
              Due Date
            </Form.Label>
            <Col sm="9" md="8" lg="6">
              <Form.Control
                type="date"
                onChange={(e) => updateAssignment("dueDate", e.target.value)}
                value={assignment.dueDate}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="my-3" controlId="dueDate">
            <Form.Label column sm="3" md="2">
              Number of submissions{" "}
            </Form.Label>
            {submissionNumber ? (
              <Col sm="9" md="8" lg="6">
                <Badge bg="info" text="dark">
                  {submissionNumber}
                </Badge>{" "}
              </Col>
            ) : (
              <Col sm="9" md="8" lg="6">
                <Badge bg="info" text="dark">
                  0
                </Badge>{" "}
              </Col>
            )}
          </Form.Group>
          <div className="d-flex gap-5">
            <Button size="lg" onClick={() => save(assignment)}>
              Update
            </Button>

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

export default AssignmentViewReviewer;
//TODO: CHANGE THE SRC CODE TO DISPLAY ONLY THE ASSIGNMENTS
