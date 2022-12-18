import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  ButtonGroup,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  ListGroup,
  Row,
  Table,
} from "react-bootstrap";
import { useLocalState } from "../util/useLocalStorage";
import ApiService from "../service/ApiService";

const SubmissionsView = () => {
  const [jwt, setJwt] = useLocalState("", "jwt"); //store a state of an object
  const [allCourses, setAllCourses] = useState([]);
  const [currentCourse, setCurrentCourse] = useState([]);

  const [showAssignments, setShowAssignments] = useState(false);
  const [submissions, setSubmissions] = useState([
    // {
    //   id: null,
    //   dueDate: "",
    //   number: null,
    //   status: null,
    //   branch: null,
    //   gitUrl: null,
    //   dateSubmitted: null,
    //   user: null,
    // },
  ]);
  const [showSubmissions, setShowSubmissions] = useState(false);
  const [courseAssignments, setCourseAssignments] = useState([]);

  const [assignment, setAssignment] = useState({
    id: null,
    dueDate: "",
    number: null,
    status: null,
    branch: null,
    gitUrl: null,
    dateSubmitted: null,
    // userId: null,
  });

  useEffect(() => {
    ApiService.GetCoursesForInstructor(jwt)
      .then((response) => {
        if (response.status === 200) return response.json();
        else return Promise.reject("failed to fetch courses");
      })
      .then((courseData) => {
        console.log(courseData);
        setAllCourses(courseData);
      });
  }, []);

  function getAssignmentsByCourse(course) {
    ApiService.GetAssignmentsByCourse(course.id, jwt)
      .then((response) => {
        if (response.status === 200) return response.json();
        else return Promise.reject("cannot fetch assignments for course");
      })
      .then((assignmentResponse) => {
        setCourseAssignments(assignmentResponse.assignments);
      });
  }

  function getSubmittedByAssignment(course, assignmentNumber) {
    ApiService.GetSubmittedAssignmentsByCourse(course.id, assignmentNumber, jwt)
      .then((response) => {
        if (response.status === 200) return response.json();
        else return Promise.reject("cannot fetch assignments for course");
      })
      .then((assignmentResponse) => {
        setSubmissions(assignmentResponse);
        console.log(submissions);
      });
  }

  return (
    <Container className="mt-5">
      <Row className="d-flex align-items-center">
        <Col>
          <h1>Submissions</h1>
        </Col>
      </Row>

      <Row className="my-2">
        {allCourses.map((course) => {
          console.log(course);
          return (
            <ListGroup action className="my-2">
              <ListGroup.Item
                action
                onClick={() => {
                  setShowAssignments(true);
                  setCurrentCourse(course);
                  getAssignmentsByCourse(course);
                }}
              >
                {course.department} - {course.name}
              </ListGroup.Item>
            </ListGroup>
          );
        })}
        {showAssignments ? (
          <Container className="my-2 d-flex justify-content-between">
            {assignment ? (
              <>
                <Form.Group
                  as={Row}
                  className="my-1"
                  controlId="assignmentName"
                >
                  <Col sm="9" md="8" lg="6">
                    <DropdownButton
                      onSelect={(selectedElement) => {
                        getSubmittedByAssignment(
                          currentCourse,
                          selectedElement
                        );
                        setShowSubmissions(true);
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
                <Form.Group
                  as={Row}
                  className="my-3"
                  controlId="dueDate"
                ></Form.Group>
              </>
            ) : (
              <></>
            )}
            <Button
              variant="secondary"
              size="md"
              onClick={() => {
                setShowAssignments(false);
                setShowSubmissions(false);
              }}
            >
              Close
            </Button>
          </Container>
        ) : (
          <></>
        )}
      </Row>
      {showSubmissions ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>User Id</th>
              <th>Branch</th>
              <th>GitHub URL</th>
              <th>Submission Date</th>
            </tr>
          </thead>
          <tbody>
            {submissions.length > 0 ? (
              submissions.map((submission) => {
                return (
                  <tr>
                    <td>{submission.user}</td>
                    <td>{submission.branch}</td>
                    <td>{submission.gitUrl}</td>
                    <td>{submission.dateSubmitted}</td>
                  </tr>
                );
              })
            ) : (
              <> </>
            )}
          </tbody>
        </Table>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default SubmissionsView;
