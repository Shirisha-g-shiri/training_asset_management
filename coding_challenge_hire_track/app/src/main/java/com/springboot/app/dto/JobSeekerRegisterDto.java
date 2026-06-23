package com.springboot.app.dto;

import com.springboot.app.enums.Degree;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record JobSeekerRegisterDto(
        @NotBlank
        @NotNull
        String name,
        @NotBlank
        @NotNull
        String username,
        @NotBlank
        @NotNull
        String password,
        @NotBlank
        @NotNull
        String resumeSummary,
        @NotNull
        int age,
        @NotNull
        Degree degree
) {
}
