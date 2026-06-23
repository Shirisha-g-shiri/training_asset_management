package com.app.dto;

import com.app.enums.AssetStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.Instant;

public record AssetDto(
        @NotNull
        AssetStatus assetStatus,
        @NotNull
        @NotBlank
        String name,
        @NotNull
        @NotBlank
        String assetNo,
        @NotNull
        Double value,
        @NotNull(message = "This field is mandatory")
        String model,
        @NotNull
        int stock,
        Instant manufacturingDate,
        Instant expiryDate
) {

}
