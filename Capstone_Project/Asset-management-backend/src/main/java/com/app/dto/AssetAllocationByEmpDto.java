package com.app.dto;

import com.app.enums.AllocationStatus;

import java.time.Instant;

public record AssetAllocationByEmpDto(
        int allocationId,
        AllocationStatus allocationStatus,
        int assetId,
        String assetName,
        String assetCategoryName,
        String employeeName,
        String employeeEmail,
        Instant returnDate

) {
}
