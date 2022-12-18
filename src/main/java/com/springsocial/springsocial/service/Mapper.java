package com.springsocial.springsocial.service;

import com.springsocial.springsocial.dto.AssignmentDto;
import com.springsocial.springsocial.dto.CourseDto;
import com.springsocial.springsocial.entities.Assignment;
import com.springsocial.springsocial.entities.Course;
import com.springsocial.springsocial.entities.CreatedAssignment;
import com.springsocial.springsocial.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class Mapper {
    @Autowired
    private UserRepository userRepository;

    public Course dtoToCourseMapper(CourseDto courseDto) {
        return new Course()
                .setDepartment(courseDto.getDepartment())
                .setNumber(courseDto.getNumber())
                .setId(courseDto.getId())
                .setCredits(courseDto.getCredits())
                .setFinalDate(courseDto.getFinalDate())
                .setInstructor(userRepository.findByUsername(courseDto.getInstructor()).orElse(null))
                .setName(courseDto.getName());

    }

    public CourseDto courseToDtoMapper(Course course) {
        return new CourseDto()
                .setDepartment(course.getDepartment())
                .setNumber(course.getNumber())
                .setId(course.getId())
                .setCredits(course.getCredits())
                .setFinalDate(course.getFinalDate())
                .setInstructor(course.getInstructor() == null ? null : course.getInstructor().getUsername())
                .setName(course.getName());
    }

    public AssignmentDto assignmentToAssignmentDtoMapper(Assignment assignment) {
        return new AssignmentDto()
                .setDueDate(assignment.getDueDate())
                .setNumber(assignment.getNumber())
                .setId(assignment.getId())
                .setStatus(assignment.getStatus())
                .setBranch(assignment.getBranch())
                .setGitUrl(assignment.getGitUrl())
                .setDateSubmitted(assignment.getDateSubmitted())
                .setGrade(assignment.getGrade())
                .setUser(assignment.getUser().getId());
    }

    public AssignmentDto createdAssignmentToAssignmentDtoMapper(CreatedAssignment assignment) {
        return new AssignmentDto()
                .setDueDate(assignment.getDueDate())
                .setNumber(assignment.getNumber())
                .setId(assignment.getId())
                .setStatus(assignment.getStatus())
                .setBranch(null)
                .setGitUrl(null)
                .setDateSubmitted(null)
                .setGrade(null);
    }

    public Assignment createdAssignmentToAssignmentMapper(CreatedAssignment assignment) {
        return new Assignment()
                .setDueDate(assignment.getDueDate())
                .setNumber(assignment.getNumber())
                .setId(assignment.getId())
                .setStatus(assignment.getStatus())
                .setBranch(null)
                .setGitUrl(null)
                .setDateSubmitted(null)
                .setGrade(null);
    }


}
