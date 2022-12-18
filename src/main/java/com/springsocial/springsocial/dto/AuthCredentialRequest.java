package com.springsocial.springsocial.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

@Getter
@Setter
@Accessors(chain = true)
public class AuthCredentialRequest {
    private String username;
    private String password;

}
