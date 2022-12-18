package com.springsocial.springsocial.repository;

import com.springsocial.springsocial.entities.Authority;
import com.springsocial.springsocial.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AuthorityRepository extends JpaRepository<Authority, Long> {

    @Query("select a.user from Authority a where a.authority = ?1")
    List<User> findUserIdByAuthority(String authority);

}
