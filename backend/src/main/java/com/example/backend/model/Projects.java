package com.example.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.io.Serializable;

@Entity
@Table(name="projects")
public class Projects implements Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	@Column
	private String projectTitle;
	@Column
	private String technologies;
	@Column(length = 3000)
	private String details;
	@JsonIgnore
	@ManyToOne(targetEntity=com.example.backend.model.Applicant.class,fetch=FetchType.LAZY)
	@JoinColumn(name = "applicant_id")
	private Applicant applicant;

	public Projects() {
	}

	public Projects(String projectTitle, String technologies, String details, Applicant applicant) {
		this.projectTitle = projectTitle;
		this.technologies = technologies;
		this.details = details;
		this.applicant = applicant;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getProjectTitle() {
		return projectTitle;
	}

	public void setProjectTitle(String projectTitle) {
		this.projectTitle = projectTitle;
	}

	public String getTechnologies() {
		return technologies;
	}

	public void setTechnologies(String technologies) {
		this.technologies = technologies;
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
}