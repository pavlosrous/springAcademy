package com.springsocial.springsocial.dto;

import lombok.Data;
import lombok.experimental.Accessors;

import java.time.LocalDate;

@Data
@Accessors(chain = true)
public class CourseDto {
    private Long id;
    private LocalDate finalDate;
    private String name;
    private String instructor;
    private Integer credits;
    private String department;
    private Integer number;
}
