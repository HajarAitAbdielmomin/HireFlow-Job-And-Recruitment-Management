package com.example.backend.security.services;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import com.example.backend.model.Applicant;

import java.util.*;

public class ApplicantDetailsImpl extends UserDetailsImpl {
    private static final long serialVersionUID = 1L;

    private final Date birthDate;
    private final String address;
    private final int phone;
    private final String status;

    public ApplicantDetailsImpl(Applicant applicant,Collection<? extends GrantedAuthority> authorities) {
        super(applicant.getId(),applicant.getFullname(),applicant.getEmail(),applicant.getPassword(),applicant.getGender(), applicant.getImage(),authorities);

        this.birthDate = applicant.getBirthDate();
        this.address = applicant.getAddress();
        this.phone = applicant.getPhone();
        this.status = applicant.getStatus();
    }
    public static ApplicantDetailsImpl build(Applicant applicant) {
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_APPLICANT"));
        authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
        return new ApplicantDetailsImpl(
                applicant,
                authorities);
    }
    public Date getBirthDate() {
        return birthDate;
    }

    public String getAddress() {
        return address;
    }

    public int getPhone() {
        return phone;
    }

    public String getStatus() {
        return status;
    }


}

