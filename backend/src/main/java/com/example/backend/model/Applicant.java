package com.example.backend.model;
import java.io.Serializable;
import java.util.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.hibernate.annotations.Cascade;

@Entity

@Inheritance(strategy=InheritanceType.SINGLE_TABLE)
@DiscriminatorValue("applicant")
public class Applicant extends User implements Serializable {
	@Column
	private Date birthDate;
	@Column
	private String address;

	@Column
	private int phone;
	@Column
	private String status;
	@OneToMany(mappedBy="applicant", fetch=FetchType.LAZY,targetEntity=com.example.backend.model.Application.class, cascade = {CascadeType.PERSIST, CascadeType.REMOVE})

	private List<Application> application = new ArrayList<>();
	@OneToMany(mappedBy="applicant",fetch=FetchType.LAZY,targetEntity=com.example.backend.model.Education.class,cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
	private List<Education> education = new ArrayList<>();

	@OneToMany(mappedBy="applicant", fetch=FetchType.LAZY,targetEntity=com.example.backend.model.Projects.class,cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
	private List<Projects> projects = new ArrayList<>();
	@OneToMany(mappedBy="applicant", targetEntity=com.example.backend.model.Interview.class, fetch= FetchType.LAZY,cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
	private List<Interview> interviews = new ArrayList<>();
	@JsonIgnore
	@ManyToMany
	@JoinTable(name = "skills_applicant",
			joinColumns = @JoinColumn(name = "applicant_id"),
			inverseJoinColumns = @JoinColumn(name = "skill_id"))
	private List<Skills> skills = new ArrayList<>();

	public Applicant(String email, String password, String fullname,String image ,Date birthDate, String address, int phone,char gender) {
		super(email, password, fullname,gender,image);
		this.birthDate = birthDate;
		this.address = address;
		this.phone = phone;
	}

	public Applicant() {

	}

	public List<Interview> getInterviews() {
		return interviews;
	}

	public void setInterviews(List<Interview> interviews) {
		this.interviews = interviews;
	}

	public Date getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(Date birthDate) {
		this.birthDate = birthDate;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public int getPhone() {
		return phone;
	}

	public void setPhone(int phone) {
		this.phone = phone;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public List<Skills> getSkills() {
		return skills;
	}

	public void setSkills(List<Skills> skills) {
		this.skills = skills;
	}
}