package com.example.backend.model;


import jakarta.persistence.*;

import java.io.Serializable;
import java.util.*;
@Entity
@Inheritance(strategy=InheritanceType.SINGLE_TABLE)
@DiscriminatorValue("recruiter")
public class Recruiter extends User implements Serializable {


    public Recruiter(String email, String password, String fullname, String image,char gender) {
        super(email, password, fullname, gender,image);
    }

// cascade = CascadeType.ALL
    @OneToMany(mappedBy="recruiter", targetEntity=com.example.backend.model.Job.class, fetch = FetchType.EAGER,cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<Job> job = new ArrayList<>();

    public Recruiter() {}
    public List<Job> getJob() {
        return job;
    }

    public void setJob(List<Job> job) {
        this.job = job;
    }
}