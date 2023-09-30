package com.example.backend.model;
import java.io.Serializable;
import java.util.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name="application")
public class Application implements Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	@Column
	private String resumeFile;
	@Column(length = 2000)
	private String details;
	@JsonIgnore
	@ManyToOne(targetEntity=com.example.backend.model.Applicant.class, fetch=FetchType.LAZY)
	@JoinColumn(name = "applicant_id")
	private Applicant applicant;
	@JsonIgnore
	@ManyToOne(targetEntity=com.example.backend.model.Job.class,fetch=FetchType.LAZY)
	@JoinColumn(name = "job_id")
	private Job job;
	@Column
	private Date applicationDate;
	@Column
	private String status = "sent";
	@Column
	private int isSelected = 0;

	public Application() {
	}

	public Application(String resumeFile, String details, Applicant applicant, Job job, Date applicationDate, String status, int isSelected) {
		this.resumeFile = resumeFile;
		this.details = details;
		this.applicant = applicant;
		this.job = job;
		this.applicationDate = applicationDate;
		this.status = status;
		this.isSelected = isSelected;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getResumeFile() {
		return resumeFile;
	}

	public void setResumeFile(String resumeFile) {
		this.resumeFile = resumeFile;
	}

	public String getDetails() {
		return details;
	}

	public void setDetails(String details) {
		this.details = details;
	}

	public Applicant getApplicant() {
		return applicant;
	}

	public void setApplicant(Applicant applicant) {
		this.applicant = applicant;
	}

	public Job getJob() { return job; }

	public void setJob(Job job) { this.job = job; }

	public Date getApplicationDate() {
		return applicationDate;
	}

	public void setApplicationDate(Date applicationDate) {
		this.applicationDate = applicationDate;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public int getIsSelected() {
		return isSelected;
	}

	public void setIsSelected(int isSelected) {
		this.isSelected = isSelected;
	}
}