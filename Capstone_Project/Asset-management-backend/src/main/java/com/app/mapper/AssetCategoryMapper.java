package com.app.mapper;

import com.app.dto.AssetCategoryDto;
import com.app.dto.AssetCategoryRespDto;
import com.app.dto.AssetRequestRespDto;
import com.app.model.Asset;
import com.app.model.AssetCategory;
import com.app.model.AssetRequest;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class AssetCategoryMapper {
    public static AssetCategoryRespDto mapEntityTODto(Page<AssetCategory> pages) {
        long totalElements =  pages.getTotalElements();
        int totalPages = pages.getTotalPages();
        List<AssetCategory> list = pages.getContent();
        return new AssetCategoryRespDto(
                totalElements,
                totalPages,
                list
        );
    }

    public static AssetCategory mapDtoToEntity(@Valid AssetCategoryDto assetCategoryDto) {
        AssetCategory assetCategory = new AssetCategory();
        assetCategory.setDescription(assetCategoryDto.description());
        assetCategory.setName(assetCategoryDto.name());
        return assetCategory;
    }
}
