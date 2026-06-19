package com.springboot.app.dto;

import java.time.Instant;

public record ApplicationRespDto(
        int applicationId,
        Instant appliedAt,
        String jobTitle,
        String companyName
) {
}
