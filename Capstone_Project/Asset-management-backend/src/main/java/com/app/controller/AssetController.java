package com.app.controller;

import com.app.dto.AssetDto;
import com.app.dto.AssetRespDto;
import com.app.enums.AssetStatus;
import com.app.model.Asset;
import com.app.service.AssetService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;
import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AssetController {

    private final AssetService assetService;

    @GetMapping("/api/asset/all")
    public List<Asset> getAll(){
        return assetService.getAll();
    }


    @GetMapping("/api/asset/all/v2")
    public AssetRespDto getAllV2(@RequestParam(defaultValue = "0", required = false) int page,
                                 @RequestParam(defaultValue = "5", required = false) int size,
                                 @RequestParam(required = false) String status,
                                 @RequestParam(required = false) String sort,
                                 @RequestParam(required = false) Long categoryId){
        return assetService.getAllWithPagination( page,size,status,sort,categoryId);
    }
    @PostMapping("/api/asset/add/{asset_category_id}")
    public Asset addAsset(@Valid @RequestBody AssetDto assetDto, @PathVariable int asset_category_id, Principal principal){
        String adminUsername = principal.getName();
        return assetService.insert(assetDto,asset_category_id,adminUsername);
    }


    @GetMapping("/api/asset/type")
    public List<Asset> getAllByType(@RequestParam AssetStatus assetStatus){
        return assetService.getAllByType(assetStatus);
    }

//    @GetMapping("/api/asset/by-asset-category/{asset_category_id}")
//    public List<Asset> getAllByCategory(@PathVariable int asset_category_id){
//        return assetService.getAllByCategory(asset_category_id);
//    }


    @GetMapping("/api/asset/get-one/{id}")
    public ResponseEntity<Object> getById(@PathVariable int id){
        Asset asset = assetService.getById(id);
        return ResponseEntity.ok().body(asset);
    }

    @PutMapping("/api/asset/update/{id}")
    public Asset update(@RequestBody AssetDto assetUpdateDto , @PathVariable int id){

        return assetService.update(id,assetUpdateDto);
    }

    @DeleteMapping("/api/asset/delete/{id}")
    public void delete(@PathVariable int id){
        assetService.delete(id);
    }


    @PutMapping("/api/asset/upload/{asset_id}")
    public void upload(Principal principal,
                       @RequestParam("file") MultipartFile file, @PathVariable int asset_id) throws IOException {
        //file is the actual doc/image user is uploading.

        String username = principal.getName();
        assetService.upload(username,asset_id, file);
    }

//    @PostMapping("/api/asset/add")
//    public void insert(@RequestBody Asset asset){
//        assetService.insert(asset);
//    }

//    @GetMapping("/api/asset/get-one/{id}")
//    public ResponseEntity<Object> getById(@PathVariable int id){
//        try{
//            Asset asset = assetService.getById(id);
//            return ResponseEntity.ok().body(asset);
//        } catch(ResourceNotFoundException e){
//            return ResponseEntity.badRequest().body(e.getMessage());
//
//        }
//    }
//
//    @PutMapping("/api/asset/update/{id}")
//    public ResponseEntity<Object> update(@RequestBody Asset updatedAsset , @PathVariable int id){
//        try{
//            assetService.update(id,updatedAsset);
//            return ResponseEntity.ok().build();
//        } catch(ResourceNotFoundException e){
//            return ResponseEntity.badRequest().body(e.getMessage());
//
//        }
//    }
//
//    @DeleteMapping("/api/asset/delete/{id}")
//    public ResponseEntity<Object> delete(@PathVariable int id){
//        try {
//            assetService.delete(id);
//            return ResponseEntity.ok().build();
//        }catch (ResourceNotFoundException e){
//            return ResponseEntity.badRequest().body(e.getMessage());
//        }
//    }


}
