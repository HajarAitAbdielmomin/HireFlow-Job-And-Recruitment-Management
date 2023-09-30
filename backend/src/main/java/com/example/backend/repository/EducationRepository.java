package com.example.backend.repository;

import com.example.backend.model.Education;
import com.example.backend.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface EducationRepository extends JpaRepository<Education, Long> {

    @Query("SELECT ed FROM Education ed where  ed.applicant.id = :idApp")
    List<Education> findByApplicant(long idApp);
}
