package com.app.dto;

import jakarta.validation.constraints.NotNull;


public record AssetAllocationDto(
        @NotNull
        String remarks
) {
}
