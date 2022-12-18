package com.springsocial.springsocial.controllers;

import com.springsocial.springsocial.RegistrationAlreadyExists;
import com.springsocial.springsocial.dto.CourseDto;
import com.springsocial.springsocial.entities.Course;
import com.springsocial.springsocial.entities.User;
import com.springsocial.springsocial.service.Mapper;
import com.springsocial.springsocial.service.CourseService;
import com.springsocial.springsocial.service.RegistrationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cs/courses")
@Slf4j
public class CourseController {

    @Autowired
    private CourseService courseService;

    @Autowired
    private Mapper mapper;

    @Autowired
    private RegistrationService registrationService;

    @GetMapping("")
    public ResponseEntity<?> getAllCourses(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(courseService.getAllCourses());
    }

    @PostMapping("")
    public ResponseEntity<?> createCourse(@AuthenticationPrincipal User user) {
        Course newCourse = courseService.saveCourse();
        return ResponseEntity.ok(newCourse);
    }

    @GetMapping("{courseId}")
    public ResponseEntity<?> getCourse(@PathVariable Long courseId, @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(courseService.findCourseById(courseId));
    }

    @PutMapping(path = "{courseId}")
    public ResponseEntity<?> updateCourse(@PathVariable("courseId") Long courseId,
                                          @RequestBody CourseDto course, @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(courseService.updateCourse(mapper.dtoToCourseMapper(course)));
    }

    @GetMapping("/instructor")
    public ResponseEntity<?> getCoursesForInstructor(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(courseService.getCoursesForInstructor(user));
    }

    @PostMapping("/register/{courseId}")
    public ResponseEntity<?> register(@PathVariable("courseId") Long courseId, @AuthenticationPrincipal User user) {
        try {
            return ResponseEntity.ok(registrationService.register(courseId, user));
        } catch (RegistrationAlreadyExists e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping("/student")
    public ResponseEntity<?> getCoursesForStudent(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(courseService.getCoursesForStudent(user));
    }

}
