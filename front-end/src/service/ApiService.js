export default class ApiService {
  static LoginRequest(username, password) {
    return fetch("api/auth/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    }).then((response) => response);
  }

  static PostAssignment(jwt) {
    // console.log(jwt);
    return fetch("api/assignments", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "POST",
    }).then((response) => response);
  }

  static GetAssignments(jwt) {
    return fetch("api/assignments", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "GET",
      // body: JSON.stringify({}),
    }).then((response) => response);
  }

  static GetAssignment(assignmentNumber, courseId, jwt) {
    return fetch(`/api/assignments/get/${courseId}/${assignmentNumber}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "GET",
      // body: JSON.stringify({}),
    }).then((response) => response);
  }

  static UpdateAssignment(id, assignment, jwt) {
    return fetch(`/api/assignments/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "PUT",
      body: JSON.stringify(assignment),
    }).then((response) => response);
  }

  static GetTokenStatus(jwt) {
    return fetch(`/api/auth/validate/?token=${jwt}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "GET",
      // body: JSON.stringify({}),
    }).then((response) => response);
  }

  static GetCourses(jwt) {
    return fetch("/api/cs/courses", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "GET",
      // body: JSON.stringify({}),
    }).then((response) => response);
  }

  static GetCourse(id, jwt) {
    return fetch(`/api/cs/courses/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "GET",
    }).then((response) => response);
  }

  static PostCourse(jwt) {
    return fetch("api/cs/courses", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "POST",
    }).then((response) => response);
  }

  static UpdateCourse(id, course, jwt) {
    return fetch(`/api/cs/courses/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "PUT",
      body: JSON.stringify(course),
    }).then((response) => response);
  }

  static GetInstructors(jwt) {
    return fetch(`/api/cs/instructors`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "GET",
    }).then((response) => response);
  }

  static GetUserId(username, jwt) {
    return fetch(`/api/cs/users/${username}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "GET",
    }).then((response) => response);
  }

  static GetCoursesForInstructor(jwt) {
    return fetch("/api/cs/courses/instructor", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "GET",
    }).then((response) => response);
  }

  static Register(courseId, jwt) {
    return fetch(`/api/cs/courses/register/${courseId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "POST",
    }).then((response) => response);
  }

  //TODO: THIS AND GetForInstructor are the same. Have only one API call for both
  static GetCoursesForStudent(jwt) {
    return fetch("/api/cs/courses/student", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "GET",
    }).then((response) => response);
  }

  static PostAssignment(assignment, courseId, jwt) {
    return fetch(`api/assignments/${courseId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "POST",
      body: JSON.stringify(assignment),
    }).then((response) => response);
  }

  static GetAssignmentsByCourse(courseId, jwt) {
    return fetch(`/api/assignments/course/${courseId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "GET",
    }).then((response) => response);
  }

  static SubmitAssignment(courseId, assignment, jwt) {
    return fetch(`/api/assignments/submit/${courseId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "POST",
      body: JSON.stringify(assignment),
    }).then((response) => response);
  }

  static UpdateAssignmentDueDate(courseId, assignment, jwt) {
    return fetch(`/api/assignments/update/${courseId}/${assignment.id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "PUT",
      body: JSON.stringify(assignment),
    }).then((response) => response);
  }

  static GetNumberOfSubmissions(assignmentNumber, courseId, jwt) {
    return fetch(
      `/api/assignments/submissions/${courseId}/${assignmentNumber}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        method: "GET",
      }
    ).then((response) => response);
  }

  static GetSubmittedAssignmentsByCourse(courseId, assignmentNumber, jwt) {
    return fetch(`/api/assignments/submitted/${courseId}/${assignmentNumber}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "GET",
    }).then((response) => response);
  }
}
