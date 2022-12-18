import React, { useEffect, useState } from "react";
import { useLocalState } from "../util/useLocalStorage";
import ApiService from "../service/ApiService";
import { Badge, Button, Card, Col, Row } from "react-bootstrap";

const Dashboard = () => {
  const [jwt, setJwt] = useLocalState("", "jwt"); //store a state of an object
  const [assignments, setAssignments] = useState(null);
  const [courses, setCourses] = useState(null);

  // useEffect(() => {
  //   ApiService.GetAssignments(jwt)
  //     .then((response) => {
  //       if (response.status === 200) return response.json();
  //       else return Promise.reject("failed to fetch assignments");
  //     })
  //     .then((assignmentsData) => {
  //       setAssignments(assignmentsData);
  //     });
  // }, []);

  useEffect(() => {
    ApiService.GetCoursesForStudent(jwt)
      .then((response) => {
        if (response.status === 200) return response.json();
        else return Promise.reject("failed to fetch courses");
      })
      .then((courseData) => {
        setCourses(courseData);
      });
  }, []);

  // function createAssignment() {
  //   ApiService.PostAssignment(jwt)
  //     .then((response) => {
  //       if (response.status === 200) return response.json();
  //       else return Promise.reject("failed to create assignment");
  //     })
  //     .then((assignment) => {
  //       window.location.href = `/api/assignments/${assignment.id}`;
  //     });
  // }

  return (
    <div className="App" style={{ margin: "20px" }}>
      <br />
      <h3>Current Courses</h3>
      {/*<div className="mb-5">*/}
      {/*  <Button size="lg" onClick={() => createAssignment()}>*/}
      {/*    Submit New Assignment*/}
      {/*  </Button>*/}
      {/*</div>*/}

      {/*{assignments ? (*/}
      {/*  <div*/}
      {/*    className="d-grid gap-5"*/}
      {/*    style={{ gridTemplateColumns: "repeat(auto-fill, 18rem)" }}*/}
      {/*  >*/}
      {/*    {assignments.map((assignment) => (*/}
      {/*      <Card*/}
      {/*        key={assignment.id}*/}
      {/*        style={{ width: "18rem", height: "18rem" }}*/}
      {/*      >*/}
      {/*        <Card.Body className="d-flex flex-column justify-content-around">*/}
      {/*          <Card.Title>Assignment #{assignment.number}</Card.Title>*/}
      {/*          <div className="d-flex align-items-start">*/}
      {/*            <Badge pill bg="info" style={{ fontSize: "1rem" }}>*/}
      {/*              {assignment.status}*/}
      {/*            </Badge>{" "}*/}
      {/*          </div>*/}

      {/*          <Card.Text style={{ marginTop: "1rem" }}>*/}
      {/*            <p>Github URL: {assignment.gitUrl}</p>*/}
      {/*            <p>*/}
      {/*              <b>Branch</b>: {assignment.branch}*/}
      {/*            </p>*/}
      {/*          </Card.Text>*/}
      {/*          <Button*/}
      {/*            variant="secondary"*/}
      {/*            onClick={() => {*/}
      {/*              window.location.href = `/api/assignments/${assignment.id}`;*/}
      {/*            }}*/}
      {/*          >*/}
      {/*            Edit*/}
      {/*          </Button>*/}
      {/*        </Card.Body>*/}
      {/*      </Card>*/}
      {/*    ))}*/}
      {/*  </div>*/}
      {/*) : (*/}
      {/*  <></>*/}
      {/*)}*/}
      {courses ? (
        <div
          className="d-grid gap-5"
          style={{ gridTemplateColumns: "repeat(auto-fill, 17.45rem)" }}
        >
          {courses.map((course) => (
            <Card key={course.id} style={{ width: "17rem", height: "17rem" }}>
              <Card.Body className="d-flex flex-column justify-content-around">
                <Card.Title>
                  {course.number ? (
                    <>
                      {course.department} - {course.number}
                    </>
                  ) : (
                    "Edit Course"
                  )}
                </Card.Title>

                <Card.Text style={{ marginTop: "0.5rem" }}>
                  <p>
                    <b>Name</b>: {course.name}
                  </p>
                  <p>
                    Instructor:{" "}
                    {course.instructor ? course.instructor : "To be determined"}
                  </p>

                  <p>Credits: {course.credits}</p>
                </Card.Text>
                <Button
                  variant="secondary"
                  onClick={() => {
                    window.location.href = `/api/cs/courses/${course.id}/assignments`;
                  }}
                >
                  Assignments
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Dashboard;
