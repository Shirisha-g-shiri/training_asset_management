package com.app.controller;

import com.app.dto.AssetCategoryDto;
import com.app.dto.AssetCategoryRespDto;
import com.app.model.AssetCategory;
import com.app.service.AssetCategoryService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AssetCategoryController {
    private final AssetCategoryService assetCategoryService;
    @GetMapping("/api/asset-category/all")
    public List<AssetCategory> getAll(){
        return assetCategoryService.getAll();
    }

    @GetMapping("/api/asset-category/all/v2")
    public AssetCategoryRespDto getAllV2(@RequestParam int page,
                                         @RequestParam int size){
        return assetCategoryService.getAllWithPagination( page,size);
    }
    @PostMapping("/api/asset-category/add")
    public void addCategory(@Valid @RequestBody AssetCategoryDto assetCategoryDto, Principal principal){
        String adminUsername = principal.getName();
        assetCategoryService.insert(assetCategoryDto,adminUsername);
    }
    @GetMapping("/api/asset-category/get-one/{id}")
    public ResponseEntity<Object> getById(@PathVariable int id){
        AssetCategory assetCategory= assetCategoryService.getById(id);
        return ResponseEntity.ok().body(assetCategory);
    }

    @PutMapping("/api/asset-category/update/{id}")
    public void update(@RequestBody AssetCategoryDto assetCategoryDto , @PathVariable int id){
        assetCategoryService.update(id,assetCategoryDto);
    }

    @DeleteMapping("/api/asset-category/delete/{id}")
    public void delete(@PathVariable int id){
        assetCategoryService.delete(id);
    }

}
