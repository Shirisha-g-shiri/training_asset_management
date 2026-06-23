package com.app.dto;

import com.app.model.AssetAllocation;

import java.util.List;

public record AssetAllocationRespDto(
        long totalRecords,
        int totalPages,
        List<AssetAllocation> data
) {
}
