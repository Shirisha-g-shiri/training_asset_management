package com.app.dto;

import com.app.enums.IssueType;
import jakarta.validation.constraints.NotNull;

public record AssetServiceDto(
        @NotNull
        String description,
        @NotNull
        IssueType issueType
) {
}
