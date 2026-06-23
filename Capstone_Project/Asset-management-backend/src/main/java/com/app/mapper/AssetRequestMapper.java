package com.app.mapper;

import com.app.dto.AssetRequestDto;
import com.app.dto.AssetRequestRespDto;
import com.app.model.AssetRequest;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class AssetRequestMapper {
    public static AssetRequestRespDto mapEntityTODto(Page<AssetRequest> pages) {
        long totalElements =  pages.getTotalElements();
        int totalPages = pages.getTotalPages();
        List<AssetRequest> list = pages.getContent();
        return new AssetRequestRespDto(
                totalElements,
                totalPages,
                list
        );
    }

    public static AssetRequest mapDtoToEntity(AssetRequestDto assetRequestDto) {
        AssetRequest assetRequest = new AssetRequest();
        assetRequest.setRemarks(assetRequestDto.remarks());
        return assetRequest;
    }
}
