import React, {useEffect, useState} from "react";
import {useLocalState} from "../util/useLocalStorage";
import ApiService from "../service/ApiService";
import {
    Alert,
    Badge,
    Button,
    Card,
    Col,
    Container,
    Row,
} from "react-bootstrap";
import NavigationBar from "../Navbar";

const RegisterView = () => {
    const [jwt, setJwt] = useLocalState("", "jwt"); //store a state of an object
    const [courses, setCourses] = useState(null);
    const [submitRegistration, setSubmitRegistration] = useState(false);
    const [registrationError, setRegistrationError] = useState(false);

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

    function register(courseId) {
        ApiService.Register(courseId, jwt).then((response) => {

            if (response.status === 200) {
                setSubmitRegistration(true);
                setTimeout(() => {
                    setSubmitRegistration(false);
                }, 7000);
                return response.json();

            } else if (response.status === 400) {
                setRegistrationError(true); //display error banner
                setTimeout(() => {
                    setRegistrationError(false); // make it go away after 7 seconds
                }, 7000);
                return Promise.reject("failed to register for course");
            }
        });
    }

    return (
        <Container>
            {submitRegistration ? (
                <Alert key="registrationSuccessful" variant="success">
                    Registered successfully
                </Alert>
            ) : (
                <></>
            )}
            {registrationError ? (
                <Alert key="registrationError" variant="danger">
                    Registration already exists
                </Alert>
            ) : (
                <></>
            )}
            <Row>
                <Col>
                    <br/>
                    <h1>Registration</h1>
                </Col>
            </Row>
            <Card>
                <Card.Header>
                    <h3>Available Courses</h3>
                </Card.Header>
                <Card.Body>
                    <div className="mb-3">
                        {courses ? (
                            <div
                                className="d-grid gap-5"
                                style={{gridTemplateColumns: "repeat(auto-fill, 17.45rem)"}}
                            >
                                {courses.map((course) =>
                                    course.name ? (
                                        <Card
                                            key={course.id}
                                            style={{width: "17rem", height: "17rem"}}
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

                                                <Card.Text style={{marginTop: "0.5rem"}}>
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
                                                    variant="info"
                                                    onClick={() => register(course.id)}
                                                >
                                                    Register
                                                </Button>
                                            </Card.Body>
                                        </Card>
                                    ) : (
                                        <></>
                                    )
                                )}
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
// TODO:FIX THE DASHBOARD, MAKE STUDENT REGISTER TO COURSES. WE HAVE NEW ENTITY CALLED COURSE_REGISTRAITON TO REFLECT THESE
//
export default RegisterView;
