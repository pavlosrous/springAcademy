package com.springsocial.springsocial.service;

import com.springsocial.springsocial.entities.Authority;
import com.springsocial.springsocial.entities.User;
import com.springsocial.springsocial.enums.AuthoritiesEnum;
import com.springsocial.springsocial.repository.AuthorityRepository;
import com.springsocial.springsocial.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    private final AuthorityRepository authorityRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        Optional<User> userOptional = userRepository.findByUsername(username);
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("invalid credentials"));
    }

    public List<User> getAllByAuthority(String authority) {
        List<Long> instructorIds = authorityRepository.findUserIdByAuthority(authority)
                .stream()
                .map(user -> user.getId()) //TODO:JUST CHANGED
                .collect(Collectors.toList());

        return userRepository.findByIdIn(instructorIds);

    }

    public Long getUserIdByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new NoSuchElementException(String.format("user with username %s does not exist", username)))
                .getId();
    }
}
