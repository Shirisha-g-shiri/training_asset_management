package com.springboot.app.dto;


import java.util.List;

public record JobRespWithTotalPageDto(
        long totalRecords,
        int totalPages,
        List<JobRespDto> data
) {
}
