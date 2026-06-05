package com.springboot.app.dto;

import com.springboot.app.enums.Degree;

import java.time.Instant;

public record ApplicationRespForEmployeerDto(
        int applicationId,
        Instant appliedAt,
        String jobTitle,
        String jobSeekerName,
        int jobSeekerAge,
        Degree degree
) {
}
