package com.springsocial.springsocial;

public class RegistrationAlreadyExists extends Exception {
    public RegistrationAlreadyExists(String errorMessage) {
        super(errorMessage);
    }
}
