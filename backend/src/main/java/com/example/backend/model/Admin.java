package com.example.backend.model;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
@Inheritance(strategy=InheritanceType.SINGLE_TABLE)
@DiscriminatorValue("admin")
public class Admin extends User implements Serializable {
    public Admin() {
    }
    public Admin(String email, String password, String fullname, String image,char gender) {
        super(email, password, fullname,gender,image);
    }
}