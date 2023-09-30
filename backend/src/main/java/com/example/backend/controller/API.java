package com.example.backend.controller;


import java.util.*;
import java.util.stream.Collectors;

import com.example.backend.model.*;

import com.example.backend.security.services.UserDetailsImpl;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.example.backend.model.User;
import com.example.backend.payload.request.*;
import com.example.backend.payload.response.*;
import com.example.backend.repository.*;
import com.example.backend.security.jwt.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/hiringsystem/v1/auth")
public class API {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ApplicationRepository applicationRepository;

    @Autowired
    JobRepository jobRepository;

    @Autowired
    EducationRepository educationRepository;

    @Autowired
    ProjectRepository projectRepository;

    @Autowired
    SkillsRepository skillsRepository;

    @Autowired
    InterviewRepository interviewRepository;

    @Autowired
    InterviewResultRepository interviewResultRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @GetMapping("applicant/skillsNames/{idApplicant}")
    public List<String> getSkillsNamesByApplicant(@PathVariable long idApplicant){
        return skillsRepository.getSkillsNamesByApplicant(idApplicant);
    }

    @GetMapping("applicant/details/{id}")
    public List<Object[]> getApplicantDetails(@PathVariable long id){
        return userRepository.getApplicantSkills(id);
    }
    //handling interviews results
    @PutMapping("applicant/updateStatus/{id}")
    public ResponseEntity<User> changeStatus(@PathVariable long id){
        User app = userRepository.findById(id).get();
        ((Applicant)app).setStatus("Hired");
        return ResponseEntity.ok(userRepository.save(app));
    }

    @GetMapping("recruiter/interviewsResults/checkByApplication/{idApplication}")
    public boolean checkExistenceByApplication(@PathVariable long idApplication){

        return applicationRepository.exists(idApplication) > 0 ? true : false;
    }

    @GetMapping("recruiter/interviewsResults/check/{idI}")
    public boolean checkExistence(@PathVariable int idI){
        Interview i = interviewRepository.findById(idI).get();
        return interviewResultRepository.existsByInterview(i);
    }

    @GetMapping("recruiter/interviewsResults/{idI}")
    public ResponseEntity<InterviewResult> getResult(@PathVariable int idI){
        Interview i = interviewRepository.findById(idI).orElse(null);
       return ResponseEntity.ok(interviewResultRepository.findByInterview(i));
    }
    @PostMapping("recruiter/interviewsResults/{idI}")
    public ResponseEntity<InterviewResult> addResult(@PathVariable int idI, @RequestBody InterviewResult ir){
        Interview i = interviewRepository.findById(idI).get();
        ir.setInterview(i);
        return ResponseEntity.ok(interviewResultRepository.save(ir));
    }
    @PutMapping("recruiter/interviewsResults/update/{idIr}")
    public ResponseEntity<InterviewResult> updateResult(@PathVariable int idIr, @RequestBody InterviewResult ir){
        InterviewResult oldIr = interviewResultRepository.findById(idIr).get();

        oldIr.setResult(ir.getResult());
        oldIr.setResponse(ir.getResponse());

        return ResponseEntity.ok(interviewResultRepository.save(oldIr));
    }
    //handling interviews
    @GetMapping("recruiter/interviews/{idJ}")
    public List<Object[]> getInterviewsByJob(@PathVariable int idJ){
        return interviewRepository.interviewsDetails(idJ);
    }
    @GetMapping("recruiter/interviews/check/{idJ}/{idA}")
    public boolean check(@PathVariable int idJ, @PathVariable long idA){
        Job job = jobRepository.findById(idJ).orElse(null);
        User applicant = userRepository.findById(idA).orElse(null);

        return interviewRepository.existsByApplicantAndJob((Applicant) applicant,job);
    }
    @GetMapping("applicant/interviews/interview/{idI}")
    public ResponseEntity<Interview> getInterview(@PathVariable int idI){

        return ResponseEntity.ok(interviewRepository.findById(idI).get());
    }
    @PostMapping("recruiter/interviews/addInterview/{idJ}/{idA}")
    public ResponseEntity<Interview> addInterview(@PathVariable int idJ, @PathVariable long idA, @RequestBody Interview interview){
        User applicant = userRepository.findById(idA).get();
        Job job = jobRepository.findById(idJ).get();
        Application application = applicationRepository.findByJobAndApplicant(job,(Applicant) applicant);

        interview.setApplicant((Applicant) applicant);
        interview.setJob(job);
        application.setIsSelected(1);

        return ResponseEntity.ok(interviewRepository.save(interview));
    }
    @PutMapping("recruiter/interviews/updateInterview/{idI}")
    public ResponseEntity<Interview> updateInterview(@PathVariable int idI, @RequestBody Interview newInterview){
        Interview i = interviewRepository.findById(idI).get();

        i.setInterviewDate(newInterview.getInterviewDate());
        if(i.isAttendance()){
            i.setAttendance(false);
        }

        return ResponseEntity.ok(interviewRepository.save(i));
    }
    @PutMapping("applicant/interviews/attendance/{idI}")
    public ResponseEntity<Interview> setAttendence(@PathVariable int idI, @RequestBody Interview newInterview){
        Interview i = interviewRepository.findById(idI).get();

        i.setAttendance(newInterview.isAttendance());

        return ResponseEntity.ok(interviewRepository.save(i));
    }
    @GetMapping("recruiter/interviews/interview/{idJ}/{idA}")
    public ResponseEntity<Interview> getInterview(@PathVariable int idJ, @PathVariable long idA){
        User applicant = userRepository.findById(idA).get();
        Job job = jobRepository.findById(idJ).get();

        return ResponseEntity.ok(interviewRepository.findByApplicantAndJob((Applicant) applicant,job));
    }
    @GetMapping("applicant/interviews/{idA}")
    public List<Object[]> getInterviewsByApplicants(@PathVariable long idA){
        return interviewRepository.findInterviewsByApplicantId(idA);
    }
    //handling skills
    @PostMapping("applicant/skills/addSkill/{idApplicant}")
    public ResponseEntity<Skills> addSkill(@PathVariable long idApplicant,@RequestBody Skills s){
        User applicant = userRepository.findById(idApplicant).get();

        s.getApplicants().add((Applicant) applicant);

        ((Applicant) applicant).getSkills().add(s);

        return ResponseEntity.ok(skillsRepository.save(s));
    }
    @PostMapping("applicant/skills/addSkill/{idApplicant}/{idSkill}")
    public ResponseEntity<String> addSkill(@PathVariable long idApplicant,@PathVariable long idSkill){
        User applicant = userRepository.findById(idApplicant).get();
        Skills skill = skillsRepository.findById(idSkill).get();
        if (!((Applicant)applicant).getSkills().contains(skill)) {
            // Add the skill to the applicant's skills
            ((Applicant)applicant).getSkills().add(skill);
            // Update the applicant
            userRepository.save(applicant);
            return ResponseEntity.ok("The skill is assigned");
        } else {
            // Skill is already associated with the applicant
            return ResponseEntity.badRequest().body("The skill is already assigned !!"); // You can return a custom response here
        }
    }
    @DeleteMapping ("applicant/skills/remove/{idS}/{idA}")
    public ResponseEntity<Map<String, Boolean>> removeSkill(@PathVariable long idS,@PathVariable long idA){
        Skills skill = skillsRepository.findById(idS).get();
        long id = skill.getId();
        User applicant = userRepository.findById(idA).get();
        ((Applicant)applicant).getSkills().remove(skill);
        skill.getApplicants().remove((Applicant) applicant);
        //skillsRepository.delete(skill);
        userRepository.save(applicant);
        skillsRepository.save(skill);
        Map<String, Boolean> response = new HashMap<>();
        response.put("Skill deleted from the list", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
    @DeleteMapping ("applicant/skills/delete/{idS}")
    public ResponseEntity<Map<String, Boolean>> removeSkill(@PathVariable long idS){
        Skills skill = skillsRepository.findById(idS).get();

        for (Applicant applicant : skill.getApplicants()) {
            applicant.getSkills().remove(skill);
        }
        // Delete the skill
        skillsRepository.delete(skill);
        Map<String, Boolean> response = new HashMap<>();
        response.put("Skill deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    @GetMapping("applicant/skills/all/{idApplicant}")
    public List<Skills> getSkillsByApplicant(@PathVariable long idApplicant){
        return skillsRepository.getSkillsByApplicant(idApplicant);
    }
    @GetMapping("applicant/skills/all")
    public List<Skills> getAllSkills(){
        return skillsRepository.findAll();
    }
    @GetMapping("applicant/skills/{id}")
    public Skills getSkill(@PathVariable long id){
        return skillsRepository.findById(id).get();
    }

    //Handling project model
    @PostMapping("applicant/project/addProject/{idApplicant}")
    public ResponseEntity<Projects> addProject(@RequestBody Projects p, @PathVariable long idApplicant){
        User applicant = userRepository.findById(idApplicant).get();
        p.setApplicant((Applicant) applicant);
        //((Applicant) applicant)
        return ResponseEntity.ok(projectRepository.save(p));
    }
    @PutMapping("applicant/project/updateProject/{idP}")
    public ResponseEntity<Projects> updateEducation(@PathVariable long idP, @RequestBody Projects newProject){
        Projects p = projectRepository.findById(idP).get();

        p.setProjectTitle(newProject.getProjectTitle());
        p.setTechnologies(newProject.getTechnologies());
        p.setDetails(newProject.getDetails());

        Projects updatedP = projectRepository.save(p);

        return ResponseEntity.ok(updatedP);
    }
    @DeleteMapping ("applicant/project/remove/{idP}")
    public ResponseEntity<Map<String, Boolean>> removeProject(@PathVariable long idP){
        Projects p = projectRepository.findById(idP)
                .orElseThrow(() -> new RuntimeException("ProjectNotFoundException"));
        projectRepository.delete(p);
        Map<String, Boolean> response = new HashMap<>();
        response.put("Project deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
    @GetMapping("applicant/project/all/{idApplicant}")
    public List<Projects> getProjectsByApplicant(@PathVariable long idApplicant){
        return projectRepository.findByApplicant(idApplicant);
    }
    @GetMapping("applicant/project/{id}")
    public Projects getProject(@PathVariable long id){
        return projectRepository.findById(id).get();
    }
    //Handling education model
    @PostMapping("applicant/education/addEducation/{idApplicant}")
    public ResponseEntity<Education> addEducation(@RequestBody Education ed, @PathVariable long idApplicant){
        User applicant = userRepository.findById(idApplicant).get();
        ed.setApplicant((Applicant) applicant);
        return ResponseEntity.ok(educationRepository.save(ed));
    }
    @PutMapping("applicant/education/updateEducation/{idEdu}")
    public ResponseEntity<Education> updateEducation(@PathVariable long idEdu, @RequestBody Education newEducation){
        Education ed = educationRepository.findById(idEdu).get();

        ed.setAcademyName(newEducation.getAcademyName());
        ed.setMajor(newEducation.getMajor());
        ed.setDegree(newEducation.getDegree());
        ed.setStartYear(newEducation.getStartYear());
        ed.setEndYear(newEducation.getEndYear());

        Education updatedEdu = educationRepository.save(ed);

        return ResponseEntity.ok(updatedEdu);
    }
    @DeleteMapping ("applicant/education/remove/{idEdu}")
    public ResponseEntity<Map<String, Boolean>> removeEducation(@PathVariable long idEdu){
        Education ed = educationRepository.findById(idEdu)
                .orElseThrow(() -> new RuntimeException("ProjectNotFoundException"));
        educationRepository.delete(ed);
        Map<String, Boolean> response = new HashMap<>();
        response.put("Education deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
    @GetMapping("applicant/education/all/{idApplicant}")
    public List<Education> getEducationsByApplicant(@PathVariable long idApplicant){
        return educationRepository.findByApplicant(idApplicant);
    }
    @GetMapping("applicant/education/{id}")
    public Education getEducation(@PathVariable long id){
        return educationRepository.findById(id).get();
    }
    //handling applications to job
    @DeleteMapping("applicant/application/remove/{id}")
    public ResponseEntity<Map<String, Boolean>> removeApplication(@PathVariable long id){
        Application ap = applicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("AppicationNotFoundException"));

        applicationRepository.delete(ap);
        Map<String, Boolean> response = new HashMap<>();
        response.put("Application deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
    @GetMapping("applicant/application/jobIds/{idA}")
    public List<Long> getJobIds(@PathVariable long idA){
        return applicationRepository.getIdsJobsByApplicant(idA);
    }
    @GetMapping("applicant/application/details")
    public List<Object[]>  getAppsDetails(){
        return applicationRepository.getApplicationDetails();
    }

    @GetMapping("applicant/application/details/{idA}")
    public List<Object[]>  getAppsDetails(@PathVariable long idA){
        return applicationRepository.getApplicationDetails(idA);
    }

    @GetMapping("applicant/application/{id}")
    public ResponseEntity<Application> getApp(@PathVariable long id){
        Application application = applicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("ApplicationNotFound"));

        return ResponseEntity.ok(application);
    }
    @PostMapping("applicant/application/{idJob}/{idApplicant}")
    public ResponseEntity<Application> addApplication(@RequestBody Application app, @PathVariable Integer idJob, @PathVariable long idApplicant){
        User applicant = userRepository.findById(idApplicant).get();
        Job job = jobRepository.findById(idJob).get();

        app.setApplicant((Applicant) applicant);
        app.setJob(job);
        app.setApplicationDate(new Date());

        return ResponseEntity.ok(applicationRepository.save(app));
    }
    @PutMapping("applicant/application/cancel/{idApp}")
    public ResponseEntity<Application> cancel(@PathVariable Long idApp){
        Application app = applicationRepository.findById(idApp).get();

        if(app.getStatus().equals("sent")) app.setStatus("Canceled");

        Application updatedApp = applicationRepository.save(app);
        return ResponseEntity.ok(updatedApp);
    }
    @PutMapping("applicant/application/update/{id}")
    public ResponseEntity<Application> updateApplication(@PathVariable long id,@RequestBody Application app){
        Application application = applicationRepository.findById(id).get();

        application.setDetails(app.getDetails());
        application.setResumeFile(app.getResumeFile());
        application.setApplicationDate(new Date());

        Application updatedApp = applicationRepository.save(application);
        return ResponseEntity.ok(updatedApp);
    }

    //handling jobs
    //for applicants (I think I won't need it)
    @GetMapping("recruiter/job/allJobs")
    public List<Job> getAllJobs(){
        return jobRepository.findAll();
    }
    //for applicants
    @GetMapping("applicant/jobs/details")
    public List<Object[]> getDetails(){
        return jobRepository.getJobDetailsWithRecruiterInfo();
    }
    //----//

    //////////////////////count methods
    @GetMapping("applicant/job/nbrJobs/{idApplicant}")
    public long nbrJobsForEachApplicant(@PathVariable Long idApplicant){
        return applicationRepository.countJobsForEachApplicant(idApplicant);
    }
    @GetMapping("recruiter/job/nbrApplicants")
    public List<Object[]> nbrApplicantsForEachJob(){

        return applicationRepository.countApplicantsForEachJob();
    }
    @GetMapping("recruiter/job/countJobsByRecruiter/{idRec}")
    public Integer countJobs(@PathVariable long idRec){

        return jobRepository.countJobsByRecruiter(idRec);
    }
    @GetMapping("recruiter/job/countJobs")
    public long nbrJobs(){
        return jobRepository.count();
    }
    //////////////////////

    @GetMapping("recruiter/job/applicants/{idJ}")
    public List<Object[]> getApplicantsForEachJobs(@PathVariable int idJ ){
        return applicationRepository.findApplicationsByJobId(idJ);
    }

   @PostMapping("recruiter/job/addJob/{idRec}")
   public ResponseEntity<Job> addJob(@PathVariable Long idRec,@RequestBody Job job){
       User rec = userRepository.findById(idRec).get();
       //System.out.println("user :"+rec);
       job.setRecruiter((Recruiter) rec);
       return ResponseEntity.ok(jobRepository.save(job));
   }

    @GetMapping("recruiter/job/jobs/{id}")
    public List<Job> getJobsByRecruiters(@PathVariable long id){
        User rec = userRepository.findById(id).get();

        return jobRepository.findByRecruiter((Recruiter) rec);
    }
    @GetMapping("recruiter/job/{id}")
    public ResponseEntity<Job> getById(@PathVariable Integer id){
        Job job = jobRepository.findById(id).orElseThrow(() -> new RuntimeException("JobNotFound"));
        return ResponseEntity.ok(job);
    }
    @DeleteMapping("recruiter/job/remove/{id}")
    public ResponseEntity<Map<String, Boolean>> removeJob(@PathVariable Integer id){
        Job job = jobRepository.findById(id).orElseThrow(() -> new RuntimeException("JobNotFoundException"));

        jobRepository.delete(job);
        Map<String, Boolean> response = new HashMap<>();
        response.put("Job deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
    @PutMapping("recruiter/job/update/{id}")
    public ResponseEntity<Job> updateJob(@PathVariable Integer id, @RequestBody Job newJob){
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("job not exist with id :" + id));

        job.setContract(newJob.getContract());
        job.setCity(newJob.getCity());
        job.setDescription(newJob.getDescription());
        job.setCompanyName(newJob.getCompanyName());
        job.setPositionName(newJob.getPositionName());
        job.setReleaseDate(new Date());
        job.setSalary(newJob.getSalary());


        Job updatedJob = jobRepository.save(job);
        return ResponseEntity.ok(updatedJob);
    }

    //the methods below is for admin's content
    @PutMapping("admin/applicant/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody Applicant userDetails){
        Applicant user = (Applicant) userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("user not exist with id :" + id));

        user.setEmail(userDetails.getEmail());
        user.setPassword(encoder.encode(userDetails.getPassword()));
        user.setFullname(userDetails.getFullname());
        user.setImage(userDetails.getImage());

         user.setBirthDate(userDetails.getBirthDate());
           user.setAddress(userDetails.getAddress());
          user.setGender(userDetails.getGender());
         user.setPhone(userDetails.getPhone());


        Applicant updatedUser = userRepository.save(user);
        return ResponseEntity.ok(updatedUser);
    }
    @PutMapping("admin/users/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userDetails){
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("user not exist with id :" + id));

        user.setEmail(userDetails.getEmail());
        user.setPassword(encoder.encode(userDetails.getPassword()));
        user.setFullname(userDetails.getFullname());
        user.setImage(userDetails.getImage());
        user.setGender(userDetails.getGender());

        User updatedUser = userRepository.save(user);
        return ResponseEntity.ok(updatedUser);
    }


    @DeleteMapping("admin/remove/{id}")
    public  ResponseEntity<Map<String, Boolean>> deleteUser(@PathVariable Long id){
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("UserNotFoundException"));

        userRepository.delete(user);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
    @GetMapping("admin/user/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("UserNotFound"));

        return ResponseEntity.ok(user);
    }

    @GetMapping("admin/app/allApp")
    public List<User> getAllApplicants(){
        return userRepository.findAll().stream().filter(user ->(user instanceof Applicant)).collect(Collectors.toList());
    }
    @GetMapping("admin/rec/allRec")
    public List<User> getAllRecruiters(){
     return userRepository.findAll().stream().filter(user ->(user instanceof Recruiter)).collect(Collectors.toList());
    }

    @GetMapping(value="admin/dashboard/countAll")
    public long countAllUsers(){
        return userRepository.count();
    }
    @GetMapping(value="admin/dashboard/countApplicants")
    public long countApplicants(){
        return userRepository.findAll().stream().filter(user -> !(user instanceof Admin || user instanceof Recruiter)).collect(Collectors.toList()).stream().count();
    }
    @GetMapping(value="admin/dashboard/countRecruiters")
    public long countRecruiters(){
        return userRepository.findAll().stream().filter(user -> !(user instanceof Admin || user instanceof Applicant)).collect(Collectors.toList()).stream().count();
    }

   @GetMapping(value="admin/dashboard/domination")
   public List<Double> domination(){
        List<Double> statistics = new ArrayList<>();

        long countAdmins = userRepository.findAll().stream().filter(user -> !(user instanceof Recruiter || user instanceof Applicant)).collect(Collectors.toList()).stream().count();
        long countRecruiters = userRepository.findAll().stream().filter(user -> !(user instanceof Admin || user instanceof Applicant)).collect(Collectors.toList()).stream().count();
        long countApplicants = userRepository.findAll().stream().filter(user -> !(user instanceof Admin || user instanceof Recruiter)).collect(Collectors.toList()).stream().count();

        double applicants =((double) countApplicants/userRepository.count())*100;
        double recruiters = ( (double) countRecruiters/userRepository.count())*100;
        double admins = ((double) countAdmins/userRepository.count())*100;

        statistics.add(applicants);
        statistics.add(recruiters);
        statistics.add(admins);

        return statistics;
   }
   @GetMapping("admin/dashboard/users")
   public List<User> getAllUsers(){
       return userRepository.findAll().stream().filter(user -> !(user instanceof Admin)).collect(Collectors.toList());
   }
    @GetMapping("admin/dashboard/gendersStatisticsApp")
    public List<Object> applicantsByGenders(){
        return userRepository.countAppByGender();
    }
    @GetMapping("admin/dashboard/gendersStatisticsRec")
    public List<Object> recruitersByGenders(){
        return userRepository.countRecByGender();
    }


    //the methods below is for authentication and registration
    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), (loginRequest.getPassword())));


        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());
        System.out.println("roles :"+roles);
        if(roles.contains("ROLE_APPLICANT")){
            return ResponseEntity.ok(new JwtResponse(jwt,
                    userDetails.getId(),
                    userDetails.getFullName(),
                    userDetails.getUsername(),
                    userDetails.getGender(),
                    userDetails.getImage(),
                    userDetails.getBirthDate(),
                    userDetails.getAddress(),
                    userDetails.getPhone(),
                    userDetails.getStatus(),
                    roles));
        }
        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getFullName(),
                userDetails.getUsername(),
                userDetails.getGender(),
                userDetails.getImage(),
                roles));

    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }
        // Create new user's account
        User user = new User(signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()),
                signUpRequest.getFullname(),
                signUpRequest.getGender(),
                signUpRequest.getPic());

        String strRoles = signUpRequest.getRole();
         System.out.println("role :"+strRoles);
        if (strRoles == null) {
            signUpRequest.setRole("user"); userRepository.save(user);
        } else {
                switch (strRoles) {
                    case "admin":
                        Admin admin = new Admin(user.getEmail(),user.getPassword(),user.getFullname(),user.getImage(),user.getGender());
                        userRepository.save(admin);
                        break;
                    case "recruiter":
                        Recruiter rec = new Recruiter(user.getEmail(),user.getPassword(),user.getFullname(),user.getImage(),user.getGender());
                        userRepository.save(rec);
                        break;
                    case "applicant" :
                                Applicant applicant = new Applicant(
                                signUpRequest.getEmail(),
                                encoder.encode(signUpRequest.getPassword()),
                                signUpRequest.getFullname(),
                                signUpRequest.getPic(),
                                signUpRequest.getBirthDate(),
                                signUpRequest.getAddress(),
                                signUpRequest.getPhone(),
                                user.getGender()
                        );


                        userRepository.save(applicant);
                        break;
                    default:
                        return ResponseEntity.ok(new MessageResponse("RoleNotFoundException !!!"));

            }
        }




        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }
}
