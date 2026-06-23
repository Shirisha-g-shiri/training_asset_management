package com.app.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record AssetCategoryDto(
        @NotNull
        @NotBlank(message = "This field is mandatory")
        String name,
        @NotNull
        @NotNull
        String description
) {

}
