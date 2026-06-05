package com.springboot.app.service;

import com.springboot.app.dto.JobSeekerRegisterDto;
import com.springboot.app.enums.Role;
import com.springboot.app.model.Employer;
import com.springboot.app.model.JobSeeker;
import com.springboot.app.model.User;
import com.springboot.app.repository.JobSeekerRepository;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class JobSeekerService {
    private final JobSeekerRepository jobSeekerRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserService userService;
    public void addJobSeeker(@Valid JobSeekerRegisterDto dto) {
        String username = dto.username();
        String password = dto.password();
        Role role = Role.SEEKER;
        String encodedPassword = passwordEncoder.encode(password);

        User user = new User();
        user.setUsername(username);
        user.setPassword(encodedPassword);
        user.setRole(role);
        user = userService.save(user);


        JobSeeker jobSeeker= new JobSeeker();
        jobSeeker.setName(dto.name());
        jobSeeker.setResumeSummary(dto.resumeSummary());
        jobSeeker.setAge(dto.age());
        jobSeeker.setDegree(dto.degree());
        jobSeeker.setUser(user);
        jobSeekerRepository.save(jobSeeker);
    }

    public JobSeeker getJobSeekerByUsername(String name) {
       return jobSeekerRepository.findByUserUsername(name);
    }
}
