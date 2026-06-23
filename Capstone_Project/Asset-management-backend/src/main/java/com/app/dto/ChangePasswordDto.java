package com.app.dto;

import jakarta.validation.constraints.NotBlank;

public record ChangePasswordDto(
        @NotBlank
        String oldPassword,
        @NotBlank
        String newPassword,
        @NotBlank
        String confirmPassword
) {
}
