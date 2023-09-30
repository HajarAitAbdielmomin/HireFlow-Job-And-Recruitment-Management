package com.example.backend.repository;

import com.example.backend.model.Education;
import com.example.backend.model.Projects;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Projects, Long> {

    @Query("SELECT p FROM Projects p where  p.applicant.id = :idApp")
    List<Projects> findByApplicant(long idApp);
}
