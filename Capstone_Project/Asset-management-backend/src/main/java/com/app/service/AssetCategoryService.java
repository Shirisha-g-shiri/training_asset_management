package com.app.service;

import com.app.dto.AssetCategoryDto;
import com.app.dto.AssetCategoryRespDto;
import com.app.expections.ResourceNotFoundException;
import com.app.mapper.AssetCategoryMapper;
import com.app.model.Admin;
import com.app.model.AssetCategory;
import com.app.repository.AdminRepository;
import com.app.repository.AssetCategoryRepository;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class AssetCategoryService {
    private final AssetCategoryRepository assetCategoryRepository;
    private final AssetCategoryMapper assetCategoryMapper;
    private final UserService userService;
    private final AdminRepository adminRepository;

    public AssetCategoryRespDto getAllWithPagination(int page, int size) {
        Pageable pageable = PageRequest.of(page,size);
        Page<AssetCategory> pages =  assetCategoryRepository.findAll(pageable);
        return AssetCategoryMapper.mapEntityTODto(pages);
    }

    public AssetCategory insert(@Valid AssetCategoryDto assetCategoryDto, String adminUsername) {
        Admin admin = adminRepository.getAdminByUserName(adminUsername);
        AssetCategory assetCategory = AssetCategoryMapper.mapDtoToEntity(assetCategoryDto);
        assetCategory.setAdmin(admin);
        assetCategoryRepository.save(assetCategory);
        return assetCategory;
    }

    public AssetCategory getById(int id) {
        return assetCategoryRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Invalid Asset Category Id !!"));
    }

    public void update(int id, AssetCategoryDto updatedAssetCategory) {
        AssetCategory existingAssetCategory = getById(id);
        existingAssetCategory.setDescription(updatedAssetCategory.description());
        existingAssetCategory.setName(updatedAssetCategory.name());
        assetCategoryRepository.save(existingAssetCategory);
    }

    public void delete(int id) {
        getById(id);
        assetCategoryRepository.deleteById(id);
    }

    public List<AssetCategory> getAll() {
        return assetCategoryRepository.findAll();
    }
}
