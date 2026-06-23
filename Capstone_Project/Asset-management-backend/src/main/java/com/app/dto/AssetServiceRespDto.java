package com.app.dto;

import com.app.model.AssetService;

import java.util.List;

public record AssetServiceRespDto(
        long totalRecords,
        int totalPages,
        List<AssetService> data
) {
}
