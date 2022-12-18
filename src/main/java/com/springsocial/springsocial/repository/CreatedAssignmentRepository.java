package com.springsocial.springsocial.repository;

import com.springsocial.springsocial.entities.Course;
import com.springsocial.springsocial.entities.CreatedAssignment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.Set;


public interface CreatedAssignmentRepository extends JpaRepository<CreatedAssignment, Long> {

    Optional<Set<CreatedAssignment>> findAllByCourse(Course course);

    Optional<CreatedAssignment> findByCourseAndId(Course course, Long id);

    Optional<CreatedAssignment> findByCourseAndNumber(Course course, Integer assignmentNumber);
}
