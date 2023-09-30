package com.example.backend.repository;

import com.example.backend.model.Skills;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SkillsRepository extends JpaRepository<Skills,Long> {

    @Query("SELECT s FROM Skills s JOIN s.applicants a WHERE a.id = :idApp")
    List<Skills> getSkillsByApplicant(long idApp);

    @Query("SELECT s.name FROM Skills s JOIN s.applicants a WHERE a.id = :idApp")
    List<String> getSkillsNamesByApplicant(long idApp);
}
