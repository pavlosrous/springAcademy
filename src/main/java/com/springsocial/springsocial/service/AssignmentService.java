package com.springsocial.springsocial.service;

import com.springsocial.springsocial.dto.AssignmentDto;
import com.springsocial.springsocial.dto.AssignmentResponseDto;
import com.springsocial.springsocial.entities.Assignment;
import com.springsocial.springsocial.entities.Course;
import com.springsocial.springsocial.entities.CreatedAssignment;
import com.springsocial.springsocial.entities.User;
import com.springsocial.springsocial.enums.StatusEnum;
import com.springsocial.springsocial.repository.AssignmentRepository;
import com.springsocial.springsocial.repository.CoursesRepository;
import com.springsocial.springsocial.repository.CreatedAssignmentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.criteria.CriteriaBuilder;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class AssignmentService {

    private final AssignmentRepository assignmentRepository;

    private final CoursesRepository coursesRepository;

    private final CreatedAssignmentRepository createdAssignmentRepository;

    private final Mapper mapper;

    public Assignment saveAssignment(User user) {
        Assignment assignment = new Assignment()
                .setStatus(StatusEnum.PENDING_SUBMISSION.getStatus())
                .setNumber(findNextAssignment(user))
                .setUser(user);

        return assignmentRepository.save(assignment);
    }

    public CreatedAssignment saveAssignment(CreatedAssignment assignment, Long courseId) {
        return createdAssignmentRepository.save(assignment
                .setStatus(StatusEnum.PENDING_SUBMISSION.getStatus())
                .setDueDate(assignment.getDueDate())
                .setCourse(coursesRepository.findById(courseId)
                        .orElseThrow(() ->
                                new NoSuchElementException(String.format("no course with id %s was found", courseId))))
        );
    }

    private Integer findNextAssignment(User user) {
        Set<Assignment> assignmentsByUser = assignmentRepository.findByUser(user)
                .orElse(null);
        if (assignmentsByUser == null) {
            return 1;
        }
        Optional<Integer> nextAssignmentNum = assignmentsByUser.stream()
                .sorted((a1, a2) -> {
                    if (a1.getNumber() == null) return 1;
                    if (a2.getNumber() == null) return 1;
                    return a2.getNumber().compareTo(a1.getNumber());
                })
                .map(assignment -> assignment.getNumber() + 1)
                .findFirst();
        return nextAssignmentNum.orElse(1);

    }

    public Set<Assignment> getAssignmentsByUser(User user) {
        return assignmentRepository.findByUser(user)
                .orElseGet(() -> {
                    log.info(String.format("No assignment assigned to user %s", user.getId()));
                    return null;
                });
    }

    public Optional<Assignment> findAssignmentById(Long assignmentId) {
        return assignmentRepository.findById(assignmentId);
    }


    public Assignment submitAssignment(Assignment assignment, Long courseId) {
        return assignmentRepository.save(assignment
                .setCourse(coursesRepository.findById(courseId)
                        .orElseThrow(() -> new NoSuchElementException("no course for assignment %s was found"))
                )
                .setStatus(StatusEnum.SUBMITTED.getStatus())
                .setId(null)
                .setDateSubmitted(LocalDate.now()));
    }

    @Transactional
    public Assignment updateAssignment(Assignment assignment) {
        Assignment assignmentToSubmit = assignmentRepository.findById(assignment.getId())
                .orElseThrow(() -> new NoSuchElementException());


        return assignmentToSubmit
                .setBranch(assignment.getBranch())
                .setGitUrl(assignment.getGitUrl())
                .setDateSubmitted(LocalDate.now());
    }


    public AssignmentResponseDto getAssignmentsByCourse(Long courseId) {
        return new AssignmentResponseDto(
                createdAssignmentRepository
                        .findAllByCourse(coursesRepository.findById(courseId)
                                .orElseThrow(() -> new NoSuchElementException("course does not exist"))
                        )
                        .orElseGet(() -> new HashSet<>())
                        .stream()
                        .map(createdAssignment -> mapper.createdAssignmentToAssignmentDtoMapper(createdAssignment))
                        .collect(Collectors.toSet())
        );
    }

    @Transactional
    public Assignment updateAssignmentDueDate(Assignment assignment, Long courseId) {

        Course course = coursesRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("updating assignment of unknown course is not allowed"));

        createdAssignmentRepository.findByCourseAndNumber(course, assignment.getNumber())
                .orElseThrow(() -> new NoSuchElementException(String.format("no created assignment with number %s for course %s", assignment.getNumber(), course.getName())))
                .setDueDate(assignment.getDueDate());

        return assignmentRepository.findAllAssignmentsByNumberAndCourse(assignment.getNumber(), course)
                .orElseThrow(() -> new NoSuchElementException("assign"))
                .stream()
                .map(element -> element.setDueDate(assignment.getDueDate()))
                .findAny()
                .orElseThrow(() -> new NoSuchElementException("an unexpected error has occured while updating due date"));

    }

    public Optional<AssignmentDto> findByNumberAndUserAndCourse(Integer assignmentNumber, User user, Long courseId) {

        List<AssignmentDto> assignmentList = new LinkedList<>();

        Course course = coursesRepository.findById(courseId)
                .orElseThrow(() -> new NoSuchElementException(String.format("no course with id %s found", courseId)));

        Optional<Assignment> submittedAssignment = assignmentRepository.findByCourseAndUserAndNumber(course, user, assignmentNumber);

        if (submittedAssignment.isPresent()) {
            return Optional.ofNullable(mapper.assignmentToAssignmentDtoMapper(submittedAssignment.get()));
        } else {
            return Optional.ofNullable(mapper.createdAssignmentToAssignmentDtoMapper(createdAssignmentRepository.findByCourseAndNumber(course, assignmentNumber).get()));
        }

    }

    public Integer getSumbmissionNumber(Integer assignmentNumber, Long courseId) {
        Course course = coursesRepository.findById(courseId)
                .orElseThrow(() -> new NoSuchElementException(String.format("no course with id %s found", courseId)));

        return assignmentRepository.findAllAssignmentsByNumberAndCourse(assignmentNumber, course)
                .orElse(new ArrayList<>())
                .size();

    }

    public List<AssignmentDto> getSubmittedAssignments(Integer assignmentNumber, Long courseId) {
        Course course = coursesRepository.findById(courseId)
                .orElseThrow(() -> new NoSuchElementException(String.format("no course with id %s found", courseId)));

        return assignmentRepository.findAllAssignmentsByNumberAndCourse(assignmentNumber, course)
                .orElse(new ArrayList<>())
                .stream()
                .filter(assignment -> assignment.getStatus().equals(StatusEnum.SUBMITTED.getStatus()))
                .map(assignment -> mapper.assignmentToAssignmentDtoMapper(assignment))
                .collect(Collectors.toList());

    }
}
