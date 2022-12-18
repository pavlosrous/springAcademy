package com.springsocial.springsocial.enums;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum AuthoritiesEnum {
    REVIEWER("ROLE_REVIEWER"),
    STUDENT("ROLE_STUDENT"),
    ADMIN("ROLE_ADMIN");

    private String role;
}
