package com.springsocial.springsocial.controllers;

import com.springsocial.springsocial.entities.User;
import com.springsocial.springsocial.service.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/cs/")
public class UserController {
    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @GetMapping("instructors")
    public ResponseEntity<?> getAllInstructors(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(userDetailsService.getAllByAuthority("ROLE_REVIEWER"));
    }

    @GetMapping("users/{username}")
    public ResponseEntity<?> getAllInstructors(@PathVariable("username") String username, @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(userDetailsService.getUserIdByUsername(username));
    }


}
