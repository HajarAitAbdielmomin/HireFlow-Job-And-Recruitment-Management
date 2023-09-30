package com.example.backend.security.services;

import com.example.backend.model.*;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
  @Autowired
  private UserRepository userRepository;

  @Override
  @Transactional
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    User user = userRepository.findByEmail(username)
            .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));

    UserDetails userDetails;

    if (user instanceof Applicant) {
      userDetails = ApplicantDetailsImpl.build((Applicant) user);
    } else if (user instanceof Recruiter) {
      userDetails = RecruiterDetailsImpl.build( (Recruiter) user);
    } else if (user instanceof Admin) {
      userDetails = AdminDetailsImpl.build((Admin)user);
    } else {
      throw new UsernameNotFoundException("User type not recognized: " + user.getClass().getSimpleName());
    }

    return userDetails;
  }

}
