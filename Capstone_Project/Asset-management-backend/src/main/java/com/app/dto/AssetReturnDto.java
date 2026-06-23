package com.app.dto;

import jakarta.validation.constraints.NotNull;

import java.time.Instant;

public record AssetReturnDto(
        @NotNull
        Instant return_date
) {
}
