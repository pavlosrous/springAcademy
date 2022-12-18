package com.springsocial.springsocial.entities;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@Accessors(chain = true)
@Table(name = "submitted_assignment")
@RequiredArgsConstructor
public class Assignment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private Integer number;

    private String status;

    private String gitUrl;

    private String branch;

    @ManyToOne(optional = false)/* cannot have assignment without a user, enforce referential integrity */
    private User user;

    private LocalDate dateSubmitted;

    private LocalDate dueDate;

    @ManyToOne(optional = false)
    private Course course;

    private Float grade;
}
