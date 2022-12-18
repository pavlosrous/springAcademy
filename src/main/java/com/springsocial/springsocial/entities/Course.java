package com.springsocial.springsocial.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.Accessors;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "courses")
@NoArgsConstructor
@ToString
@Accessors(chain = true)
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate finalDate;

    private String name;

    @ManyToOne/* we can have a course without an instructor */
    private User instructor;

    private Integer credits;

    private String department;

    private Integer number;

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<CourseRegistration> registrations;

    @OneToMany(mappedBy = "number", cascade = CascadeType.ALL)
    private Set<Assignment> assignments;
}
