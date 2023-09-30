package com.example.backend.security.services;

import com.example.backend.model.Admin;
import com.example.backend.model.Recruiter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class RecruiterDetailsImpl extends UserDetailsImpl{

    public RecruiterDetailsImpl(Recruiter rec, Collection<? extends GrantedAuthority> authorities) {
        super(rec.getId(),
                rec.getFullname(),
                rec.getEmail(),
                rec.getPassword(),
                rec.getGender(),
                rec.getImage(), authorities);
    }

    public static RecruiterDetailsImpl build(Recruiter rec) {
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_RECRUITER"));
        authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
        return new RecruiterDetailsImpl(
                rec,
                authorities);
    }
}
