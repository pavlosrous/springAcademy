package com.springsocial.springsocial.repository;

import com.springsocial.springsocial.entities.Course;
import com.springsocial.springsocial.entities.CourseRegistration;
import com.springsocial.springsocial.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RegistrationRepository extends JpaRepository<CourseRegistration, Long> {

    Optional<CourseRegistration> findByUserAndCourse(User user, Course course);

    Optional<List<CourseRegistration>> findByUser(User user);
}
