package com.app.dto;

import com.app.enums.Department;
import com.app.enums.Gender;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.Instant;

public record EmployeeReqDto(
        @NotNull
        @NotBlank
        String name,
        @NotNull
        @NotBlank
        @Size(min = 4)
        String username,
        @NotNull
        @NotBlank
        String password,
        @NotNull
        @NotBlank
        String mobile_no,
        String address,
        @NotNull
        @NotBlank
        String email,
        @NotNull
        Gender gender,
        @NotNull
        String bloodGroup,
        @NotNull
        Department department,
        @NotNull
        Instant dateOfBirth,
        @NotNull
        Instant dateOfJoining
) {
}
