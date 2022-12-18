import React, { useEffect, useState } from "react";
import { useLocalState } from "../util/useLocalStorage";
import ApiService from "../service/ApiService";
import { Badge, Button, Card, Col, Container, Row } from "react-bootstrap";
import NavigationBar from "../Navbar";

const AdminDashboard = () => {
  const [jwt, setJwt] = useLocalState("", "jwt"); //store a state of an object
  const [courses, setCourses] = useState(null);

  useEffect(() => {
    ApiService.GetCourses(jwt)
      .then((response) => {
        if (response.status === 200) return response.json();
        else return Promise.reject("failed to fetch courses");
      })
      .then((courseData) => {
        console.log(courseData);
        setCourses(courseData);
      });
  }, []);

  function createCourse() {
    ApiService.PostCourse(jwt)
      .then((response) => {
        if (response.status === 200) return response.json();
        else return Promise.reject("failed to create assignment");
      })
      .then((course) => {
        window.location.href = `/api/cs/courses/${course.id}`;
      });
  }

  return (
    <Container>
      <Row>
        <Col>
          <br />
          <h1>Admin Dashboard</h1>
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
                style={{ gridTemplateColumns: "repeat(auto-fill, 17.45rem)" }}
              >
                {courses.map((course) => (
                  <Card
                    key={course.id}
                    style={{ width: "17rem", height: "17rem" }}
                  >
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
                          {course.instructor
                            ? course.instructor
                            : "To be determined"}
                        </p>

                        <p>Credits: {course.credits}</p>
                      </Card.Text>
                      <Button
                        variant="secondary"
                        onClick={() => {
                          window.location.href = `/api/cs/courses/${course.id}`;
                        }}
                      >
                        Edit
                      </Button>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            ) : (
              <></>
            )}
          </div>
          <Button size="lg" onClick={() => createCourse()}>
            Add Course
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AdminDashboard;
