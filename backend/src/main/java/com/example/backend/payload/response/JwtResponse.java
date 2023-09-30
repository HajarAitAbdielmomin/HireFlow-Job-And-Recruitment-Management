package com.example.backend.payload.response;

import java.util.Date;
import java.util.List;

public class JwtResponse {
  private String token;
  private String type = "Bearer";
  private Long id;
  private String fullName;
  private String email;
  private char gender;
  private String image;
  private List<String> roles;

  private  Date birthDate;
  private String address;
  private int phone;
  private String status;

  public JwtResponse(String accessToken, Long id, String username, String email,char gender,String image ,List<String> roles) {
    this.token = accessToken;
    this.id = id;
    this.fullName = username;
    this.email = email;
    this.gender = gender;
    this.image = image;
    this.roles = roles;
  }
  public JwtResponse(String accessToken, Long id, String username, String email, char gender, String image , Date birthday,String address,int phone,String status, List<String> roles) {
    this.token = accessToken;
    this.id = id;
    this.fullName = username;
    this.email = email;
    this.gender = gender;
    this.image = image;

    this.birthDate = birthday;
    this.address = address;
    this.phone = phone;
    this.status = status;

    this.roles = roles;
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

  public String getAccessToken() {
    return token;
  }

  public void setAccessToken(String accessToken) {
    this.token = accessToken;
  }

  public String getTokenType() {
    return type;
  }

  public void setTokenType(String tokenType) {
    this.type = tokenType;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getFullName() {
    return fullName;
  }

  public void setFullName(String username) {
    this.fullName = username;
  }

  public char getGender() {
    return gender;
  }

  public void setGender(char gender) {
    this.gender = gender;
  }

  public String getImage() {
    return image;
  }

  public void setImage(String image) {
    this.image = image;
  }

  public List<String> getRoles() {
    return roles;
  }
}
