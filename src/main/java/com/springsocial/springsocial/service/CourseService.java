package com.springsocial.springsocial.service;

import com.springsocial.springsocial.dto.CourseDto;
import com.springsocial.springsocial.entities.Course;
import com.springsocial.springsocial.entities.CourseRegistration;
import com.springsocial.springsocial.entities.User;
import com.springsocial.springsocial.repository.CoursesRepository;
import com.springsocial.springsocial.repository.RegistrationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class CourseService {

    private final Mapper mapper;
    private final CoursesRepository coursesRepository;

    private final RegistrationRepository registrationRepository;

    public List<CourseDto> getAllCourses() {
        return coursesRepository.findAll()
                .stream()
                .map(course -> mapper.courseToDtoMapper(course))
                .collect(Collectors.toList());
    }

    public Course saveCourse() {
        Course course = new Course()
                .setDepartment("CMPSC");

        return coursesRepository.save(course);
    }

    public CourseDto findCourseById(Long courseId) {
        return mapper.courseToDtoMapper(
                coursesRepository.findById(courseId).orElse(null)
        );
    }

    public CourseDto updateCourse(Course course) {
        return mapper.courseToDtoMapper(coursesRepository.save(course));
    }

    public List<CourseDto> getCoursesForInstructor(User user) {
        return coursesRepository.findByInstructor(user)
                .orElseThrow(() -> new NoSuchElementException(
                        String.format("instructor %s has no courses assigned to them", user.getUsername()))
                )
                .stream()
                .map(course -> mapper.courseToDtoMapper(course))
                .collect(Collectors.toList());
    }

    public List<CourseDto> getCoursesForStudent(User user) {
        List<CourseDto> courses = registrationRepository.findByUser(user)
                .get()
                .stream()
                .map((courseRegistration -> courseRegistration.getCourse()))
                .map(course -> mapper.courseToDtoMapper(course))
                .collect(Collectors.toList());
        return courses;
    }
}
