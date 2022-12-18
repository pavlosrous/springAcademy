package com.springsocial.springsocial.dto;

import com.springsocial.springsocial.entities.Assignment;
import com.springsocial.springsocial.enums.AssignmentEnum;
import com.springsocial.springsocial.enums.StatusEnum;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@Getter
@NoArgsConstructor
public class AssignmentResponseDto {
    //    private final List<AssignmentEnum> assignmentEnum = List.of(AssignmentEnum.values());
    private final List<StatusEnum> statusEnum = List.of(StatusEnum.values());
    private Set<AssignmentDto> assignments;

    public AssignmentResponseDto(Set<AssignmentDto> assignments) {
        this.assignments = assignments;
    }
}
