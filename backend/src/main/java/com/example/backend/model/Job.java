package com.example.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import javax.swing.*;
import java.io.Serializable;
import java.util.*;

@Entity
@Table(name="job")
public class Job implements Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@Column
	private String positionName;
	@Column(length = 2000)
	private String description;

	@Column
	private Date releaseDate = new Date();
	@Column
	private String companyName;
	@Column
	private String city;
	@Column
	private String salary;
	@Column
	private String contract = "to discuss";

	@JsonIgnore
	@ManyToOne(targetEntity=com.example.backend.model.Recruiter.class,fetch=FetchType.LAZY)
	@JoinColumn(name = "recruiter_id")
	private Recruiter recruiter;
	@OneToMany(mappedBy="job", targetEntity=com.example.backend.model.Interview.class, fetch=FetchType.LAZY,cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
	private List<Interview> interview =new ArrayList<>();
	@OneToMany(mappedBy="job", targetEntity= com.example.backend.model.Application.class, fetch=FetchType.LAZY,cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
	private List<Application> application = new ArrayList<>();

	public Job() {
	}

	public Job(String positionName, String description, String companyName, String city, String contract, Recruiter recruiter, Date releaseDate, String salary) {
		this.positionName = positionName;
		this.description = description;
		this.companyName = companyName;
		this.city = city;
		this.contract = contract;
		this.recruiter = recruiter;
		this.releaseDate = releaseDate;
		this.salary = salary;

	}



	public String getSalary() {
		return salary;
	}

	public void setSalary(String salary) {
		this.salary = salary;
	}

	public Date getReleaseDate() {
		return releaseDate;
	}

	public void setReleaseDate(Date releaseDate) {
		this.releaseDate = releaseDate;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getPositionName() {
		return positionName;
	}

	public void setPositionName(String positionName) {
		this.positionName = positionName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}


	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getContract() {
		return contract;
	}

	public void setContract(String contract) {
		this.contract = contract;
	}

	public Recruiter getRecruiter() {
		return recruiter;
	}

	public void setRecruiter(Recruiter recruiter) {
		this.recruiter = recruiter;
	}

	public List<Interview> getInterview() {
		return interview;
	}

	public void setInterview(List<Interview> interview) {
		this.interview = interview;
	}

	public List<Application> getApplication() {
		return application;
	}

	public void setApplication(List<Application> application) {
		this.application = application;
	}
}