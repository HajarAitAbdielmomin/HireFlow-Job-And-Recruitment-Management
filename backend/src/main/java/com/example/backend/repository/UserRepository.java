package com.example.backend.repository;
import com.example.backend.model.Projects;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.model.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;



@Repository
public interface UserRepository extends JpaRepository<User, Long>{
    Optional<User> findByEmail(String username);
    Boolean existsByEmail(String email);
    @Query("select count(u),u.gender from User u where type(u) <> Recruiter and type(u) <> Admin group by u.gender,type(u)")
    List<Object> countAppByGender();

    @Query("select count(u),u.gender from User u where type(u) <> Applicant and type(u) <> Admin group by u.gender,type(u)")
    List<Object> countRecByGender();

    @Query("SELECT s.name  FROM Applicant u JOIN u.skills s  where u.id = :id")
    List<Object[]> getApplicantSkills(long id);



}
