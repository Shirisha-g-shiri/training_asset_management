package com.app.controller;

import com.app.dto.*;
import com.app.model.AssetAllocation;
import com.app.service.AssetAllocationService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AssetAllocationController {

    private final AssetAllocationService assetAllocationService;

    @GetMapping("/api/asset-allocation/all")
    public AssetAllocationRespDto getAll(@RequestParam int page,
                                         @RequestParam int size){
        return assetAllocationService.getAllWithPagination( page,size);
    }

    @GetMapping("/api/asset-allocation/get-one/{id}")
    public ResponseEntity<Object> getById(@PathVariable int id){
        AssetAllocation assetAllocation= assetAllocationService.getById(id);
        return ResponseEntity.ok().body(assetAllocation);
    }

    @PostMapping("/api/asset-allocation/add/{request_id}")
    public void addAllocation(@Valid @RequestBody AssetAllocationDto assetAllocationDto, @PathVariable int request_id, Principal principal) {
        String adminUsername = principal.getName();
        assetAllocationService.insert(assetAllocationDto,request_id,adminUsername);
    }

    @PutMapping("/api/asset-allocation/{asset_allocation_id}")
    public void updateAllocation(@RequestBody AssetReturnDto dto,@PathVariable int asset_allocation_id,Principal principal ){
        String employeeUsername = principal.getName();
        assetAllocationService.update(dto.return_date(),asset_allocation_id,employeeUsername);

    }

//    FOR ADMIN
    @GetMapping("/api/asset-allocation/by-employee/{employee_id}")
    public List<AssetAllocationByEmpDto> getAllByEmployee(@PathVariable int employee_id){
        return assetAllocationService.getAllByEmployee(employee_id);
    }

//    FOR EMPLOYEE
    @GetMapping("/api/asset-allocation/by-employee-login")
    public List<AssetAllocationByEmpDto> getAllForEmplpoyee(Principal principal){
        String employeeUsername = principal.getName();
        return assetAllocationService.getAllForEmplpoyee(employeeUsername);
    }
}
