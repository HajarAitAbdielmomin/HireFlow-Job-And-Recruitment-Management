package com.example.backend.model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.io.Serializable;
import java.util.*;

@Entity
@Table(name="interview")
public class Interview implements Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@Column
	private Date interviewDate;
	@Column
	private boolean attendance;
	@OneToMany(mappedBy="interview", fetch=FetchType.LAZY,targetEntity=com.example.backend.model.InterviewResult.class, cascade = CascadeType.PERSIST)
	private List<InterviewResult> interviewResult = new ArrayList<>();

	@JsonIgnore
	@ManyToOne(targetEntity=com.example.backend.model.Applicant.class,fetch=FetchType.LAZY)
	@JoinColumn(name = "applicant_id")
	private Applicant applicant;
	@JsonIgnore
	@ManyToOne(targetEntity=com.example.backend.model.Job.class,fetch=FetchType.LAZY)
	@JoinColumn(name = "job_id")
	private Job job;

	public Interview() {
	}

	public Interview(Date interviewDate, boolean attendance, List<com.example.backend.model.InterviewResult> interviewResult, Job job) {
		this.interviewDate = interviewDate;
		this.attendance = attendance;
		this.interviewResult = interviewResult;
		this.job = job;
	}

	public Applicant getApplicant() {
		return applicant;
	}

	public void setApplicant(Applicant applicant) {
		this.applicant = applicant;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Date getInterviewDate() {
		return interviewDate;
	}

	public void setInterviewDate(Date interviewDate) {
		this.interviewDate = interviewDate;
	}

	public boolean isAttendance() {
		return attendance;
	}

	public void setAttendance(boolean attendance) {
		this.attendance = attendance;
	}

	public List<com.example.backend.model.InterviewResult> getInterviewResult() {
		return interviewResult;
	}

	public void setInterviewResult(List<com.example.backend.model.InterviewResult> interviewResult) {
		this.interviewResult = interviewResult;
	}

	public Job getJob() {
		return job;
	}

	public void setJob(Job job) {
		this.job = job;
	}
}