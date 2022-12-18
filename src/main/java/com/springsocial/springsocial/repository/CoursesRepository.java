package com.springsocial.springsocial.repository;

import com.springsocial.springsocial.entities.Course;
import com.springsocial.springsocial.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CoursesRepository extends JpaRepository<Course, Long> {

    List<Course> findAll();

    Course findByDepartment(String department);

    //TODO: the following 2 are doing the same thing. Have only one API for both and fetch by User
    Optional<List<Course>> findByInstructor(User user);

    Optional<Course> findByIdIn(List<Long> ids);

}
