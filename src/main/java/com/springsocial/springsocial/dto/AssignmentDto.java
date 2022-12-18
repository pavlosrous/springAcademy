package com.springsocial.springsocial.dto;

import com.springsocial.springsocial.entities.Assignment;
import com.springsocial.springsocial.entities.Course;
import com.springsocial.springsocial.entities.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import java.time.LocalDate;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Accessors(chain = true)
public class AssignmentDto {
    //    private final List<AssignmentEnum> assignmentEnum = List.of(AssignmentEnum.values());
//    private final List<StatusEnum> statusEnum = List.of(StatusEnum.values());
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer number;

    private String status;

    private String gitUrl;

    private String branch;

    private LocalDate dueDate;

    private LocalDate dateSubmitted;

    private Float grade;

    private Long user;

}
