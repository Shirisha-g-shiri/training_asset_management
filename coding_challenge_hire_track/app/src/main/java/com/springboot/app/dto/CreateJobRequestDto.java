package com.springboot.app.dto;

import com.springboot.app.enums.JobType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record CreateJobRequestDto(
        @NotBlank
        String title,
        @NotBlank
        String description,
        String location,
        @NotNull
        BigDecimal salary,
        @NotNull
        JobType jobType
) {
}
