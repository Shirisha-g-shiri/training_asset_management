package com.springboot.app.service;

import com.springboot.app.dto.CreateJobRequestDto;
import com.springboot.app.dto.JobRespDto;
import com.springboot.app.dto.JobRespWithTotalPageDto;
import com.springboot.app.exceptions.ResourceNotFoundException;
import com.springboot.app.mapper.JobMapper;
import com.springboot.app.model.Employer;
import com.springboot.app.model.Job;
import com.springboot.app.repository.JobRepository;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class JobService {
    private final JobRepository jobRepository;
    private final EmployerService employerService;
    private final JobMapper jobMapper;

    public void addJob(@Valid CreateJobRequestDto dto, String name) {
        Employer employer = employerService.getEmployerByUsername(name);
        Job job = jobMapper.mapDtoToEntity(dto);
        job.setEmployer(employer);
        jobRepository.save(job);
    }

    public List<JobRespDto> getAllJob(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        List<Job> list =  jobRepository.findAll(pageable).getContent();
        return list
                .stream()
                .map(JobMapper::mapEntityTODto)
                .toList();
    }

    public Job getById(int jobId) {
        return jobRepository.findById(jobId)
                .orElseThrow(()->new ResourceNotFoundException("Invalid Job Id.."));
    }

    public JobRespWithTotalPageDto getJobWithTotalPages(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Job> pages =  jobRepository.findAll(pageable);
        return jobMapper.mapEntityTODtoWithTotalPages(pages);
    }
}
