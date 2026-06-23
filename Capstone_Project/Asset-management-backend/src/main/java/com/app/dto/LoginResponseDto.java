package com.app.dto;

import com.app.enums.Department;

public record LoginResponseDto(
        int id,
        String username,
        String role,
        String name,
        Department department,
        String email,
        Boolean isFirstTime
) {
}
