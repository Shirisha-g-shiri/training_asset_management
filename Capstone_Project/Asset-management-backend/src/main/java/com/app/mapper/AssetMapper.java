package com.app.mapper;

import com.app.dto.AssetDto;
import com.app.dto.AssetRespDto;
import com.app.model.Asset;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class AssetMapper {
    public static Asset mapDtoToEntity(AssetDto assetDto){
        Asset asset = new Asset();
        asset.setModel(assetDto.model());
        asset.setName(assetDto.name());
        asset.setAssetStatus(assetDto.assetStatus());
        asset.setAssetNo(assetDto.assetNo());
        asset.setValue(assetDto.value());
        asset.setStock(assetDto.stock());
        return asset;
    }

    public static AssetRespDto mapEntityTODto(Page<Asset> pages){
        long totalElements =  pages.getTotalElements();
        int totalPages = pages.getTotalPages();
        List<Asset> list = pages.getContent();
        return new AssetRespDto(
                totalElements,
                totalPages,
                list
        );
    }
}
