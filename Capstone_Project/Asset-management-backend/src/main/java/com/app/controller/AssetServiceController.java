package com.app.controller;

import com.app.dto.*;
import com.app.enums.Status;
import com.app.model.AssetService;
import com.app.service.AssetServiceService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AssetServiceController {
    private final AssetServiceService assetServiceService;

    @GetMapping("/api/asset-service/all")
    public AssetServiceRespDto getAll(@RequestParam int page,
                                      @RequestParam int size){
        return assetServiceService.getAllWithPagination( page,size);
    }
    @GetMapping("/api/asset-service/get-one/{id}")
    public ResponseEntity<Object> getById(@PathVariable int id){
        AssetService assetService = assetServiceService.getById(id);
        return ResponseEntity.ok().body(assetService);
    }

    @PostMapping("/api/asset-service/add/{asset_id}")
    public void addService(@Valid @RequestBody AssetServiceDto assetServiceDto, @PathVariable int asset_id, Principal principal) {
        String employeeUsername = principal.getName();
        assetServiceService.insert(assetServiceDto,asset_id,employeeUsername);
    }

    @PutMapping("/api/asset-service/{asset_service_id}")
    public void updateService(@RequestParam Status status , @PathVariable int asset_service_id,Principal principal){
        String adminUsername = principal.getName();
        assetServiceService.update(status,asset_service_id,adminUsername);
    }


    @GetMapping("/api/asset-service/get-for-employee")
    public List<AssetServiceByEmpDto> getForEmployee(Principal principal){
        String employeeUsername= principal.getName();
        return assetServiceService.getForEmployee(employeeUsername);
    }

    @DeleteMapping("/api/asset-service/delete/{asset_service_id}")
    public void delete(@PathVariable int asset_service_id){
        assetServiceService.delete(asset_service_id);
    }




}
