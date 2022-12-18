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
@Table(name = "created_assignment")
@RequiredArgsConstructor
public class CreatedAssignment {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;

    @ManyToOne(optional = false)/* cannot have assignment without a user, enforce referential integrity */
    private User user;

    private LocalDate dueDate;

    @ManyToOne(optional = false)
    private Course course;

    private String status;

    private Integer number;
}
