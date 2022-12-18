package com.springsocial.springsocial.controllers;

import com.springsocial.springsocial.dto.AssignmentDto;
import com.springsocial.springsocial.dto.AssignmentResponseDto;
import com.springsocial.springsocial.entities.Assignment;
import com.springsocial.springsocial.entities.CreatedAssignment;
import com.springsocial.springsocial.entities.User;
import com.springsocial.springsocial.service.AssignmentService;
import com.springsocial.springsocial.service.Mapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/assignments")
@Slf4j
public class AssignmentController {

    private final Mapper mapper = new Mapper();
    @Autowired
    private AssignmentService assignmentService;

//    @PostMapping("")
//    public ResponseEntity<?> createAssignment(@AuthenticationPrincipal User user) {
//        Assignment newAssignment = assignmentService.saveAssignment(user);
//        return ResponseEntity.ok(newAssignment);
//    }

    @GetMapping("")
    public ResponseEntity<?> getAssignments(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(assignmentService.getAssignmentsByUser(user));
    }

    @GetMapping("get/{courseId}/{assignmentNumber}")
    public ResponseEntity<?> getAssignment(@PathVariable("assignmentNumber") Integer assignmentNumber,
                                           @AuthenticationPrincipal User user,
                                           @PathVariable("courseId") Long courseId) {
        AssignmentDto assignmentResponse = assignmentService.findByNumberAndUserAndCourse(assignmentNumber, user, courseId)
                .orElseGet(() -> {
                    log.info(String.format("No assignment with id %s for student %s exists"
                            , assignmentNumber, user.getId()));
                    return null;
                });
        return ResponseEntity.ok(assignmentResponse);
    }

    @PutMapping(path = "{assignmentId}")
    public ResponseEntity<?> updateAssignment(@PathVariable("assignmentId") Long assignmentId,
                                              @RequestBody Assignment assignment, @AuthenticationPrincipal User user) {
        Assignment newAssignment = assignmentService.updateAssignment(assignment.setUser(user));
        return ResponseEntity.ok(mapper.assignmentToAssignmentDtoMapper(newAssignment));
    }

    @PutMapping(path = "update/{courseId}/{assignmentId}")
    public ResponseEntity<?> updateAssignmentDueDate(@PathVariable("courseId") Long courseId,
                                                     @RequestBody Assignment assignment, @AuthenticationPrincipal User user) {
        Assignment newAssignment = assignmentService.updateAssignmentDueDate(assignment, courseId);
        return ResponseEntity.ok(mapper.assignmentToAssignmentDtoMapper(newAssignment));
    }

    @PostMapping("{courseId}")
    public ResponseEntity<?> createAssignment(@PathVariable("courseId") Long courseId,
                                              @RequestBody CreatedAssignment assignment,
                                              @AuthenticationPrincipal User user) {
        CreatedAssignment newAssignment = assignmentService.saveAssignment(assignment.setUser(user), courseId);
        return ResponseEntity.ok(newAssignment);
    }

    //TODO: FOR REVIEWER ASSIGNMENT VIEW
    @GetMapping("/course/{courseId}")
    public ResponseEntity<?> getAssignmentsByCourse(@PathVariable Long courseId, @AuthenticationPrincipal User user) {
        AssignmentResponseDto assignments = assignmentService.getAssignmentsByCourse(courseId);
        return ResponseEntity.ok(assignments);
    }

    @PostMapping("/submit/{courseId}")
    public ResponseEntity<?> submitAssignment(@PathVariable("courseId") Long courseId,
                                              @RequestBody Assignment assignment,
                                              @AuthenticationPrincipal User user) {
        Assignment newAssignment = assignmentService.submitAssignment(assignment.setUser(user), courseId);
        return ResponseEntity.ok(mapper.assignmentToAssignmentDtoMapper(newAssignment));
    }


    @GetMapping("/submissions/{courseId}/{assignmentNumber}")
    public ResponseEntity<?> getSubmissionNumber(@PathVariable Long courseId,
                                                 @AuthenticationPrincipal User user,
                                                 @PathVariable Integer assignmentNumber) {
        Integer submissionNumber = assignmentService.getSumbmissionNumber(assignmentNumber, courseId);
        return ResponseEntity.ok(submissionNumber);
    }

    @GetMapping("/submitted/{courseId}/{assignmentNumber}")
    public ResponseEntity<?> getSubmittedAssignmentsByCourse(@PathVariable Long courseId,
                                                             @AuthenticationPrincipal User user,
                                                             @PathVariable Integer assignmentNumber) {
        List<AssignmentDto> submitted = assignmentService.getSubmittedAssignments(assignmentNumber, courseId);
        return ResponseEntity.ok(submitted);
    }
}
