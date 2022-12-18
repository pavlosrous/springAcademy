package com.springsocial.springsocial.enums;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum AssignmentEnum {
    ASSIGNMENT_1(1),
    ASSIGNMENT_2(2),
    ASSIGNMENT_3(3),
    ASSIGNMENT_5(5),
    ASSIGNMENT_6(6),
    ASSIGNMENT_7(7),
    ASSIGNMENT_8(8);

    private int assignmentNum;
}
