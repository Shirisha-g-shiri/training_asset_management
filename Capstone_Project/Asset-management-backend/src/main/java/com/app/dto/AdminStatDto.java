package com.app.dto;

import java.util.List;

public record AdminStatDto(
        List<String> label,
        List<Long> count
) {
}
