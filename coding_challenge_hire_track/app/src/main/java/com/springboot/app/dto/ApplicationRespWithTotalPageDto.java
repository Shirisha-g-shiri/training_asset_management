package com.springboot.app.dto;

import java.util.List;

public record ApplicationRespWithTotalPageDto(
        long totalRecords,
        int totalPages,
        List<ApplicationRespDto> data
) {
}
