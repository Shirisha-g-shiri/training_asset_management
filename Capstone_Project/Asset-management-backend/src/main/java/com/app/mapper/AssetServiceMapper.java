package com.app.mapper;

import com.app.dto.AssetServiceByEmpDto;
import com.app.dto.AssetServiceDto;
import com.app.dto.AssetServiceRespDto;
import com.app.model.AssetService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class AssetServiceMapper {
    public AssetServiceRespDto mapEntityTODto(Page<AssetService> pages) {
        long totalElements =  pages.getTotalElements();
        int totalPages = pages.getTotalPages();
        List<AssetService> list = pages.getContent();
        return new AssetServiceRespDto(
                totalElements,
                totalPages,
                list
        );
    }

    public com.app.model.AssetService mapDtoToEntity(@Valid AssetServiceDto assetServiceDto) {
        AssetService assetService = new AssetService();
        assetService.setDescription(assetServiceDto.description());
        assetService.setIssueType(assetServiceDto.issueType());
        return assetService;
    }

    public AssetServiceByEmpDto mapEntityTODtoByEmp(AssetService assetService) {
        return new AssetServiceByEmpDto(
                assetService.getId(),
                assetService.getStatus(),
                assetService.getAsset().getId(),
                assetService.getAsset().getName(),
                assetService.getAsset().getAssetCategory().getName(),
                assetService.getEmployee().getName(),
                assetService.getEmployee().getEmail()
        );
    }
}
