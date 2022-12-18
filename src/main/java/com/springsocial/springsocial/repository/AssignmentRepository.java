package com.springsocial.springsocial.repository;

import com.springsocial.springsocial.entities.Assignment;
import com.springsocial.springsocial.entities.Course;
import com.springsocial.springsocial.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface AssignmentRepository extends JpaRepository<Assignment, Long> {

    Optional<Set<Assignment>> findByUser(User user);

    Optional<Set<Assignment>> findByCourse(Course course);

    @Query("select a from Assignment a where a.number=?1 and a.course=?2")
    Optional<List<Assignment>> findAllAssignmentsByNumberAndCourse(Integer assignmentNumber, Course course);

    Optional<Assignment> findByCourseAndUserAndNumber(Course course, User user, Integer number);
}
