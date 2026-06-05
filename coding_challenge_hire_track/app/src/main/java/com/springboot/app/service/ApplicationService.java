package com.springboot.app.service;

import com.springboot.app.dto.ApplicationRespDto;
import com.springboot.app.dto.ApplicationRespForEmployeerDto;
import com.springboot.app.dto.ApplicationRespWithTotalPageDto;
import com.springboot.app.mapper.ApplicationMapper;
import com.springboot.app.model.Application;
import com.springboot.app.model.Job;
import com.springboot.app.model.JobSeeker;
import com.springboot.app.repository.ApplicationRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ApplicationService {
    private final ApplicationRepository applicationRepository;
    private final JobSeekerService jobSeekerService;
    private final JobService jobService;
    private final ApplicationMapper applicationMapper;

    public void addApplication(int jobId, String name) {
        JobSeeker jobSeeker = jobSeekerService.getJobSeekerByUsername(name);
        Job job = jobService.getById(jobId);
        Application application = new Application();
        application.setJob(job);
        application.setJobSeeker(jobSeeker);
        applicationRepository.save(application);
    }

    public List<ApplicationRespDto> getMyApplication(int page, int size, String name) {
        Pageable pageable = PageRequest.of(page, size);
        List<Application> list =  applicationRepository.getApplicationByJobSeeker(name,pageable).getContent();
        return list
                .stream()
                .map(ApplicationMapper::mapEntityTODto)
                .toList();
    }

    public List<ApplicationRespForEmployeerDto> getApplicationForEmployee(int page, int size, String name) {
        Pageable pageable = PageRequest.of(page, size);
        List<Application> list =  applicationRepository.getApplicationByEmployer(name,pageable).getContent();
        return list
                .stream()
                .map(applicationMapper::mapEntityTODtoForEmployer)
                .toList();
    }


    public ApplicationRespWithTotalPageDto getMyApplicationWithTotalPages(int page, int size, String name) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Application> pages =  applicationRepository.getApplicationByJobSeeker(name,pageable);
        return applicationMapper.mapEntityTODtoWithTotalPages(pages);

    }
}
