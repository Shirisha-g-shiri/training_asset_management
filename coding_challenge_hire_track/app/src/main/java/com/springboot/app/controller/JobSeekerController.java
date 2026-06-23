package com.springboot.app.controller;

import com.springboot.app.dto.JobSeekerRegisterDto;
import com.springboot.app.service.JobSeekerService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class JobSeekerController {
    private final JobSeekerService jobSeekerService;

    @PostMapping("/api/auth/register/seeker")
    public void addJobSeeker(@Valid @RequestBody JobSeekerRegisterDto dto){
        jobSeekerService.addJobSeeker(dto);
    }
}
