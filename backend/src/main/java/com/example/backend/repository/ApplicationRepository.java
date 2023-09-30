package com.example.backend.repository;


import com.example.backend.model.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {

    //select count(*) from application a join interview i on a.applicant_id = i.applicant_id and a.job_id = i.job_id join interview_result ir on ir.interview_id = i.id;
    @Query("SELECT COUNT(*) FROM Application a JOIN Interview i ON a.applicant.id = i.applicant.id AND a.job.id = i.job.id JOIN InterviewResult ir ON ir.interview.id = i.id WHERE a.id = :idApplication")
    int exists(long idApplication);
    Application findByJobAndApplicant(Job job, Applicant applicant);

    @Query("SELECT j.positionName , j.companyName,j.city,r.fullname, r.email, a.applicationDate, a.isSelected, a.details, a.resumeFile  FROM Application a JOIN a.job j JOIN j.recruiter r")
    List<Object[]> getApplicationDetails();

    @Query("SELECT a,ap FROM Application a JOIN a.applicant ap WHERE a.job.id = :jobId")
    List<Object[]> findApplicationsByJobId(int jobId);

    @Query("SELECT j.positionName  , j.companyName,j.city,r.fullname, r.email, a.applicationDate,  a.resumeFile, a.isSelected , a.id FROM Application a JOIN a.job j JOIN j.recruiter r where a.applicant.id=:idA")
    List<Object[]> getApplicationDetails(long idA);

    @Query("SELECT j.id, COUNT(a) FROM Job j JOIN j.application a GROUP BY j")
    List<Object[]> countApplicantsForEachJob();

    @Query("SELECT COUNT(a) FROM Application a WHERE a.applicant.id = :applicantId")
    long countJobsForEachApplicant(long applicantId);

    @Query("SELECT a.job.id FROM Application a WHERE a.applicant.id = :idA")
    List<Long> getIdsJobsByApplicant(long idA);



}
