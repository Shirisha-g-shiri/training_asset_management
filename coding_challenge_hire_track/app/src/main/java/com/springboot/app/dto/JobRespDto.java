package com.springboot.app.dto;

import java.math.BigDecimal;

public record JobRespDto(
        int jobId,
        String title,
        String location,
        BigDecimal salary,
        String companyName
) {
}
