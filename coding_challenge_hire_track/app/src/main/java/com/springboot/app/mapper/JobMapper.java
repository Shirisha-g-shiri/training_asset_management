package com.springboot.app.mapper;

import com.springboot.app.dto.*;
import com.springboot.app.model.Job;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import java.util.List;


@Component
public class JobMapper {
    public Job mapDtoToEntity(@Valid CreateJobRequestDto dto) {
        Job job = new Job();
        job.setTitle(dto.title());
        job.setDescription(dto.description());
        job.setLocation(dto.location());
        job.setSalary(dto.salary());
        job.setJobType(dto.jobType());
        return job;
    }


    public static JobRespDto mapEntityTODto(Job job) {
        return new JobRespDto(
                job.getId(),
                job.getTitle(),
                job.getLocation(),
                job.getSalary(),
                job.getEmployer().getCompanyName()
        );
    }

    public JobRespWithTotalPageDto mapEntityTODtoWithTotalPages(Page<Job> pages) {
        long totalElements =  pages.getTotalElements();
        int totalPages = pages.getTotalPages();
        List<JobRespDto> list = pages.getContent()
                .stream()
                .map(JobMapper::mapEntityTODto)
                .toList();
        return new JobRespWithTotalPageDto(
                totalElements,
                totalPages,
                list
        );
    }
}
