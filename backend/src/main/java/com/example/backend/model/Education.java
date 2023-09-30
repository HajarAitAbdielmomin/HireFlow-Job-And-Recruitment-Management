package com.example.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.io.*;


@Entity
@Table(name="education")
public class Education implements Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column
	private String academyName;
	@Column
	private int startYear;
	@Column
	private int endYear;
	@Column
	private String major;
	@Column
	private String degree;
	@JsonIgnore
	@ManyToOne(targetEntity=com.example.backend.model.Applicant.class, fetch=FetchType.LAZY)
	@JoinColumn(name = "applicant_id")
	private Applicant applicant;

	public Education( String academyName, int startYear, int endYear, String major, String degree, Applicant applicant) {

		this.academyName = academyName;
		this.startYear = startYear;
		this.endYear = endYear;
		this.major = major;
		this.degree = degree;
		this.applicant = applicant;
	}

	public Education() {
	}

	public long getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getAcademyName() {
		return this.academyName;
	}

	public void setAcademyName(String academyName) {
		this.academyName = academyName;
	}

	public int getStartYear() {
		return startYear;
	}

	public void setStartYear(int startYear) {
		this.startYear = startYear;
	}

	public int getEndYear() {
		return endYear;
	}

	public void setEndYear(int endYear) {
		this.endYear = endYear;
	}

	public String getMajor() {
		return this.major;
	}

	public void setMajor(String major) {
		this.major = major;
	}

	public String getDegree() {
		return this.degree;
	}

	public void setDegree(String degree) {
		this.degree = degree;
	}

	public Applicant getApplicant() {
		return applicant;
	}

	public void setApplicant(Applicant applicant) {
		this.applicant = applicant;
	}
}