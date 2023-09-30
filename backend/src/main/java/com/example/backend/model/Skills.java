package com.example.backend.model;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Collection;
import java.util.*;

@Entity
@Table(name="skills")
public class Skills implements Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@ManyToMany(mappedBy = "skills")
	private List<Applicant> applicants = new ArrayList<>();

	@Column
	private String name;

	public Skills(List<Applicant> applicants, String name) {

		this.applicants = applicants;
		this.name = name;
	}

	public Skills() {
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public List<Applicant> getApplicants() {
		return applicants;
	}

	public void setApplicants(List<Applicant> applicants) {
		this.applicants = applicants;
	}



	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}