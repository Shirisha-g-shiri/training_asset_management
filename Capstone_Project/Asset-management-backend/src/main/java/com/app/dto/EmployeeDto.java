package com.app.dto;

import com.app.enums.Department;

public record EmployeeDto(
        int id,
        String email,
        String mobileNo,
        String name,
        Department department,
        Long noOfAsset
) {
}
