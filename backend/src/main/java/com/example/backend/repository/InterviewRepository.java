package com.example.backend.repository;

import com.example.backend.model.*;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface InterviewRepository extends JpaRepository<Interview, Integer> {

    boolean existsByApplicantAndJob(Applicant applicant, Job job);

    Interview findByApplicantAndJob(Applicant applicant, Job job);

    @Query("SELECT i.id,i.job.positionName, i.job.companyName,i.interviewDate, i.job.city, i.attendance,i.applicant.status,i.applicant.id FROM Interview i  WHERE i.applicant.id = :idApplicant")
    List<Object[]> findInterviewsByApplicantId(long idApplicant);
    @Query("SELECT i.id, i.applicant.fullname, i.applicant.email,  i.interviewDate, i.attendance FROM Interview i where i.job.id = :idJ")
    List<Object[]> interviewsDetails(int idJ);

}
