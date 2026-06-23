package com.app.service;

import com.app.dto.AssetDto;
import com.app.dto.AssetRespDto;
import com.app.enums.AssetStatus;
import com.app.expections.ResourceNotFoundException;
import com.app.mapper.AssetMapper;
import com.app.model.Admin;
import com.app.model.Asset;
import com.app.model.AssetCategory;
import com.app.model.User;
import com.app.repository.AdminRepository;
import com.app.repository.AssetCategoryRepository;
import com.app.repository.AssetRepository;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.app.utility.FileUtility;

import java.util.List;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
@AllArgsConstructor
public class AssetService {
    private final AssetMapper assetMapper;
    private final AssetRepository assetRepository;
    private final AdminService adminService;
    private final AssetCategoryRepository assetCategoryRepository;
    private final AdminRepository adminRepository;
    private final UserService userService;
    private static final String UPLOAD_LOC = "C:/Users/hp/Desktop/hexa_fsd_may_2026/AssetManagementReactApp/public/asset";

    public List<Asset> getAll() {
       return assetRepository.findAll();
    }


    public Asset insert(@Valid AssetDto assetDto, int assetCategoryId, String adminUsername) {
        AssetCategory assetCategory = assetCategoryRepository.findById(assetCategoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Invalid Category id ."));
        Admin admin = adminRepository.getAdminByUserName(adminUsername);
        Asset asset = AssetMapper.mapDtoToEntity(assetDto);
        asset.setAdmin(admin);
        asset.setAssetCategory(assetCategory);
        assetRepository.save(asset);
        return asset;
    }

    public Asset getById(int id) {
        return assetRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Invalid Asset Id !!"));
    }

    public Asset update(int id, AssetDto updatedAsset) {
        Asset existingAsset = getById(id);
        existingAsset.setAssetStatus(updatedAsset.assetStatus());
        existingAsset.setModel(updatedAsset.model());
        existingAsset.setName(updatedAsset.name());
        existingAsset.setStock(updatedAsset.stock());
        existingAsset.setAssetNo(updatedAsset.assetNo());
        existingAsset.setValue(updatedAsset.value());
        existingAsset.setManufacturingDate(updatedAsset.manufacturingDate());
        existingAsset.setExpiryDate(updatedAsset.expiryDate());
        assetRepository.save(existingAsset);
        return existingAsset;
    }

    public void delete(int id) {
        getById(id);
        assetRepository.deleteById(id);
    }

/*Pagination concept implementaion*/
    public AssetRespDto getAllWithPagination(int page, int size, String status, String sort, Long categoryId) {
        Sort sorting = Sort.unsorted();

        if ("LOW_TO_HIGH".equals(sort)) {
            sorting = Sort.by("value").ascending();
        } else if ("HIGH_TO_LOW".equals(sort)) {
            sorting = Sort.by("value").descending();
        }

        Pageable pageable = PageRequest.of(page, size, sorting);
        Page<Asset> pages;

        if (categoryId != null) {
            // filter by category (add this method to your repository)
            if ("AVAILABLE".equals(status)) {
                pages = assetRepository.getByAssetCategoryIdAndStockGreaterThan(categoryId, 0, pageable);
            } else if ("OUT_OF_STOCK".equals(status)) {
                pages = assetRepository.getByAssetCategoryIdAndStockLessThanEqual(categoryId, 0, pageable);
            } else {
                pages = assetRepository.findByAssetCategoryId(categoryId, pageable);
            }
        } else {
            if (status == null || status.isEmpty()) {
                pages = assetRepository.findAll(pageable);
            } else if ("AVAILABLE".equals(status)) {
                pages = assetRepository.findByStockGreaterThan(0, pageable);
            } else if ("OUT_OF_STOCK".equals(status)) {
                pages = assetRepository.findByStockLessThanEqual(0, pageable);
            } else {
                pages = assetRepository.findAll(pageable);
            }
        }

    return AssetMapper.mapEntityTODto(pages);
}

    public List<Asset> getAllByType(AssetStatus assetStatus) {

        return assetRepository.findByAssetStatus(assetStatus);
    }




    public void upload(String username, int assetId, MultipartFile file) throws IOException{
        // Fetch admin by given username
        User user = userService.getByUsername(username);
        adminService.getAdminByUserName(user);
        // this asset coming from DB does not have the ID path attached to it
        Asset asset = getById(assetId);
        FileUtility.validateFile(file);

        // Original filename
        String fileName = file.getOriginalFilename();

        // i am creating the path where i will upload the file: destination
        Path uploadPath =  Paths.get(UPLOAD_LOC);
        // Attach the file name to the upload path
        Path destinationPath =  uploadPath.resolve(fileName);

        // Copy the original file (Multipart) on to destination upload path
        Files.copy(file.getInputStream(), destinationPath, StandardCopyOption.REPLACE_EXISTING);

        // Save the file name in db
        asset.setIdPath(fileName);

        assetRepository.save(asset);
    }
}
