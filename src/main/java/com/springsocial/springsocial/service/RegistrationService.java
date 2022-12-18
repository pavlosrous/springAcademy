package com.springsocial.springsocial.service;

import com.springsocial.springsocial.RegistrationAlreadyExists;
import com.springsocial.springsocial.entities.Course;
import com.springsocial.springsocial.entities.CourseRegistration;
import com.springsocial.springsocial.entities.User;
import com.springsocial.springsocial.repository.CoursesRepository;
import com.springsocial.springsocial.repository.RegistrationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class RegistrationService {

    private final RegistrationRepository registrationRepository;

    private final CoursesRepository coursesRepository;

    public CourseRegistration register(Long courseId, User user) throws RegistrationAlreadyExists {

        Course course = coursesRepository.findById(courseId)
                .orElseThrow(() -> new NoSuchElementException(String.format("courseId %s does not match a course", courseId)));

        if (registrationRepository.findByUserAndCourse(user, course).isPresent()) {
            throw new RegistrationAlreadyExists(String.format("the registration for course with id %s already exist", courseId));
        } else {
            return registrationRepository.save(new CourseRegistration()
                    .setUser(user)
                    .setCourse(course)
                    .setRegisteredAt(LocalDate.now()));
        }

    }
}
