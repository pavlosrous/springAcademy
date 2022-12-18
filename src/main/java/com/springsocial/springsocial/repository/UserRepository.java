package com.springsocial.springsocial.repository;

import com.springsocial.springsocial.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    Optional<List<User>> findAllByAuthorities(String authority);

    List<User> findByIdIn(List<Long> ids);

//    @Query("select id from User")
//    List<Long> findAllUserIds();

}
