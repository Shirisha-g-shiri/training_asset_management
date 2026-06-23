package com.app.mapper;

import com.app.dto.AssetAllocationByEmpDto;
import com.app.dto.AssetAllocationDto;
import com.app.dto.AssetAllocationRespDto;
import com.app.model.AssetAllocation;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class AssetAllocationMapper {
    public AssetAllocationRespDto mapEntityTODto(Page<AssetAllocation> pages) {
        long totalElements =  pages.getTotalElements();
        int totalPages = pages.getTotalPages();
        List<AssetAllocation> list = pages.getContent();
        return new AssetAllocationRespDto(
                totalElements,
                totalPages,
                list
        );
    }

    public AssetAllocation mapDtoToEntity(AssetAllocationDto assetAllocationDto) {
        AssetAllocation assetAllocation = new AssetAllocation();
        assetAllocation.setRemarks(assetAllocationDto.remarks());
        return assetAllocation;
    }

    public AssetAllocationByEmpDto mapEntityTODtoByEmp(AssetAllocation assetAllocation) {
        return new AssetAllocationByEmpDto(
                assetAllocation.getId(),
                assetAllocation.getStatus(),
                assetAllocation.getAsset().getId(),
                assetAllocation.getAsset().getName(),
                assetAllocation.getAsset().getAssetCategory().getName(),
                assetAllocation.getEmployee().getName(),
                assetAllocation.getEmployee().getEmail(),
                assetAllocation.getReturnDate()
        );
    }
}
