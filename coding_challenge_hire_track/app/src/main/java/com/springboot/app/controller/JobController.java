package com.springboot.app.controller;

import com.springboot.app.dto.CreateJobRequestDto;
import com.springboot.app.dto.JobRespDto;
import com.springboot.app.dto.JobRespWithTotalPageDto;
import com.springboot.app.service.JobService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@AllArgsConstructor
public class JobController {

    private final JobService jobService;
    @PostMapping("/api/jobs")
    public void addJob(@Valid @RequestBody CreateJobRequestDto dto, Principal principal){
        jobService.addJob(dto,principal.getName());
    }

    @GetMapping("/api/jobs")
    public List<JobRespDto> getAllJob(@RequestParam(defaultValue = "0",required = false) int page,
                                      @RequestParam(defaultValue = "10",required = false) int size){
        return jobService.getAllJob(page,size);
    }

    //    to get total pages and total record
    @GetMapping("/api/jobs/with-total-pages")
    public JobRespWithTotalPageDto getJobWithTotalPages(@RequestParam(defaultValue = "0",required = false) int page,
                                                        @RequestParam(defaultValue = "10",required = false) int size){
        return jobService.getJobWithTotalPages(page,size);
    }
}
