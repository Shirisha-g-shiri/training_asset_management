package com.app.dto;

import com.app.model.AssetCategory;

import java.util.List;

public record AssetCategoryRespDto(
        long totalRecords,
        int totalPages,
        List<AssetCategory> data
) {
}
