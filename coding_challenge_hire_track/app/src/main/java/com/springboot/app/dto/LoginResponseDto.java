package com.springboot.app.dto;

public record LoginResponseDto(
        int id,
        String username,
        String role
) {
}
