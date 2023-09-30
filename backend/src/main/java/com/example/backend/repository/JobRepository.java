package com.example.backend.repository;


import com.example.backend.model.*;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.*;

import java.util.List;
import java.util.Map;

@Repository

public interface JobRepository extends JpaRepository<Job, Integer> {
    @Query("SELECT COUNT(j) FROM Job j WHERE j.recruiter.id = :idRec")
    Integer countJobsByRecruiter(@Param("idRec") long idRec);

    List<Job> findByRecruiter(Recruiter rec);

    @Query("SELECT j,r.fullname, r.email FROM Job j JOIN j.recruiter r")
    List<Object[]> getJobDetailsWithRecruiterInfo();

    //List<Job> findByPositionNameAndCompanyNameAndContract(String positionName, String company, String contract);
}
