package com.springsocial.springsocial.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Embeddable;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.SecondaryTable;
import java.io.Serializable;

@Embeddable
@Getter
@Setter
public class UserId implements Serializable {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

}
