package com.app.dto;

import com.app.enums.Status;

public record AssetServiceByEmpDto(
        int serviceId,
        Status status,
        int assetId,
        String assetName,
        String assetCategoryName,
        String employeeName,
        String employeeEmail
) {
}
