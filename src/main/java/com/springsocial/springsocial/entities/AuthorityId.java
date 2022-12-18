package com.springsocial.springsocial.entities;

import javax.persistence.Embeddable;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import java.io.Serializable;

@Embeddable
public class AuthorityId implements Serializable {

    //    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public UserId userId; // corresponds to ID type of Event
    public String authority;
}
