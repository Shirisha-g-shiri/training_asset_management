package com.app.dto;

import com.app.model.Asset;

import java.util.List;

public record AssetRespDto(
        long totalRecords,
        int totalPages,
        List<Asset> data
) {
}
