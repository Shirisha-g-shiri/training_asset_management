package com.app.dto;

import com.app.model.AssetRequest;

import java.util.List;

public record AssetRequestRespDto(
        long totalRecords,
        int totalPages,
        List<AssetRequest> data
) {
}
