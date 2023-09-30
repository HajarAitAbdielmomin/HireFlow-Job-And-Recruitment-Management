package com.example.backend.security.services;

import com.example.backend.model.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;
import java.util.stream.Collectors;

public class UserDetailsImpl implements UserDetails {
  private static final long serialVersionUID = 1L;

  private Long id;

  private String fullName;

  private String email;

  private char gender;
  private String image;

  @JsonIgnore
  private String password;
  private Date birthDate;
  private String address;
  private int phone;
  private String status;

  private Collection<? extends GrantedAuthority> authorities;

  public UserDetailsImpl(Long id, String fullName, String email, String password,char gender,String image,
      Collection<? extends GrantedAuthority> authorities) {
    this.id = id;
    this.fullName = fullName;
    this.email = email;
    this.password = password;
    this.gender = gender;
    this.image = image;
    this.authorities = authorities;
  }


  public static UserDetailsImpl build(User user) {
    List<GrantedAuthority> authorities = new ArrayList<>();
    authorities.add(new SimpleGrantedAuthority("ROLE_USER"));

    return new UserDetailsImpl(
        user.getId(), 
        user.getFullname(),
        user.getEmail(),
        user.getPassword(),
        user.getGender(),
        user.getImage(),
        authorities);
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

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return authorities;
  }

  public Long getId() {
    return id;
  }

  @Override
  public String getUsername() {
    return email;
  }

  public String getFullName() {
    return fullName;
  }

  @Override
  public String getPassword() {
    return password;
  }

  public char getGender() {
    return gender;
  }


  public String getImage() {
    return image;
  }


  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o)
      return true;
    if (o == null || getClass() != o.getClass())
      return false;
    UserDetailsImpl user = (UserDetailsImpl) o;
    return Objects.equals(id, user.id);
  }
}
