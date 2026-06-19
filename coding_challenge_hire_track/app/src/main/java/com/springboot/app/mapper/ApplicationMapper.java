package com.springboot.app.mapper;

import com.springboot.app.dto.ApplicationRespDto;
import com.springboot.app.dto.ApplicationRespForEmployeerDto;
import com.springboot.app.dto.ApplicationRespWithTotalPageDto;
import com.springboot.app.enums.Degree;
import com.springboot.app.model.Application;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ApplicationMapper {
    public static ApplicationRespDto mapEntityTODto(Application application) {
        return new ApplicationRespDto(
                application.getId(),
                application.getAppliedAt(),
                application.getJob().getTitle(),
                application.getJob().getEmployer().getCompanyName()
        );
    }

    public ApplicationRespForEmployeerDto mapEntityTODtoForEmployer(Application application) {
        return new ApplicationRespForEmployeerDto(
                application.getId(),
                application.getAppliedAt(),
                application.getJob().getTitle(),
                application.getJobSeeker().getName(),
                application.getJobSeeker().getAge(),
                application.getJobSeeker().getDegree()
        );
    }

    public ApplicationRespWithTotalPageDto mapEntityTODtoWithTotalPages(Page<Application> pages) {
        long totalElements =  pages.getTotalElements();
        int totalPages = pages.getTotalPages();
        List<ApplicationRespDto> list = pages.getContent()
                .stream()
                .map(ApplicationMapper::mapEntityTODto)
                .toList();
        return new ApplicationRespWithTotalPageDto(
                totalElements,
                totalPages,
                list
        );
    }

}
