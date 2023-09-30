package com.example.backend.repository;

import com.example.backend.model.Interview;
import com.example.backend.model.InterviewResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface InterviewResultRepository extends JpaRepository<InterviewResult, Integer> {
    InterviewResult findByInterview(Interview i);


    boolean existsByInterview(Interview i);


}
