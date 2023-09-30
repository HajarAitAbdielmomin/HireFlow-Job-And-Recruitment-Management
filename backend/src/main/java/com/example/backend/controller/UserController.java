package com.example.backend.controller;

import com.example.backend.model.*;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
@RequestMapping("/hiringsystem/v1/")
public class UserController {
    @Autowired
    private UserRepository userRepository;


    @GetMapping("/users")
    public List<User> getAllUsers(){
        return userRepository.findAll().stream().filter(user -> !(user instanceof Admin)).collect(Collectors.toList());
    }

    @PostMapping("/addAdmin")
    public User createUser(@RequestBody Admin admin) {
        return userRepository.save(admin);
    }

    @PostMapping("/addApplicant")
    public User createUser(@RequestBody Applicant applicant) {
        return userRepository.save(applicant);
    }

    @PostMapping("/addRecruiter")
    public User createUser(@RequestBody Recruiter recruiter) {
        return userRepository.save(recruiter);
    }

    @DeleteMapping("/removeUsers/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteUser(@PathVariable Long id){
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("UserNotFoundException"));

        userRepository.delete(user);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("UserNotFound"));
        return ResponseEntity.ok(user);
    }

    // update employee rest api
    @PutMapping("/applicant/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody Applicant userDetails){
        Applicant user = (Applicant) userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("user not exist with id :" + id));

        user.setEmail(userDetails.getEmail());
        user.setPassword(userDetails.getPassword());
        user.setFullname(userDetails.getFullname());
        user.setImage(userDetails.getImage());

         user.setBirthDate(userDetails.getBirthDate());
           user.setAddress(userDetails.getAddress());
          user.setGender(userDetails.getGender());
         user.setPhone(userDetails.getPhone());
          user.setStatus(userDetails.getStatus());


        Applicant updatedUser = userRepository.save(user);
        return ResponseEntity.ok(updatedUser);
    }
    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userDetails){
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("user not exist with id :" + id));

        user.setEmail(userDetails.getEmail());
        user.setPassword(userDetails.getPassword());
        user.setFullname(userDetails.getFullname());
        user.setImage(userDetails.getImage());


        User updatedUser = userRepository.save(user);
        return ResponseEntity.ok(updatedUser);
    }
}
