package com.example.backend.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.io.Serializable;

@Entity
@Table(name="interviewResult")
public class InterviewResult implements Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@Column
	private String result;
	@Column
	private String response;
	@JsonIgnore
	@ManyToOne(targetEntity=com.example.backend.model.Interview.class,fetch=FetchType.LAZY)
	@JoinColumn(name = "interview_id")
	private Interview interview;

	public InterviewResult() {
	}

	public InterviewResult(String result, String response, Interview interview) {
		this.result = result;
		this.response = response;
		this.interview = interview;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}

	public String getResponse() {
		return response;
	}

	public void setResponse(String response) {
		this.response = response;
	}

	public Interview getInterview() {
		return interview;
	}

	public void setInterview(Interview interview) {
		this.interview = interview;
	}
}