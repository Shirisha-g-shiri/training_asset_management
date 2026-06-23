package com.app.dto;

import jakarta.validation.constraints.NotNull;

public record AssetRequestDto(
        @NotNull
        String remarks
) {
}
