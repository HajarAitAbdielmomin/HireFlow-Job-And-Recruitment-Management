package com.example.backend.security.services;

import com.example.backend.model.Admin;
import com.example.backend.model.Applicant;
import com.example.backend.model.Recruiter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;


public class AdminDetailsImpl extends UserDetailsImpl{

    public AdminDetailsImpl(Admin rec,Collection<? extends GrantedAuthority> authorities) {
        super(rec.getId(),
                rec.getFullname(),
                rec.getEmail(),
                rec.getPassword(),
                rec.getGender(),
                rec.getImage(),authorities);
    }

    public static AdminDetailsImpl build(Admin ad) {
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
        authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
        return new AdminDetailsImpl(
                ad,
                authorities);
    }
}
