package com.app.controller;

import com.app.dto.AssetRequestDto;
import com.app.dto.AssetRequestRespDto;
import com.app.service.AssetRequestService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AssetRequestController {
    private final AssetRequestService assetRequestService;

    @GetMapping("/api/asset-request/all")
    public AssetRequestRespDto getAll(@RequestParam(defaultValue = "0" , required = false) int page,
                                                @RequestParam(defaultValue = "10" , required = false) int size){
        return assetRequestService.getAllWithPagination( page,size);
    }

    @GetMapping("/api/asset-request/all-emp")
    public AssetRequestRespDto getAllByEmp(@RequestParam(defaultValue = "0" , required = false) int page,
                                      @RequestParam(defaultValue = "10" , required = false) int size , Principal principal){
        return assetRequestService.getAllByEmpWithPagination( page,size,principal.getName());
    }

    @PostMapping("/api/asset-request/add/{asset_id}")
    public void addRequest(@Valid @RequestBody AssetRequestDto assetRequestDto, @PathVariable int asset_id , Principal principal) {
        String employeeUsername = principal.getName();
        assetRequestService.insert(assetRequestDto,asset_id,employeeUsername);
    }

    @PutMapping("/api/asset-request/update-reject/{asset_request_id}")
    public void updateRejectRequest(@PathVariable int asset_request_id , Principal principal) {
        String adminUsername = principal.getName();
        assetRequestService.updateReject(asset_request_id,adminUsername);
    }
//    FOR EMPLOYEE
    @GetMapping("/api/asset-request/pending")
    public AssetRequestRespDto getAllPending(@RequestParam int page,
                                     @RequestParam int size , Principal principal){
        return assetRequestService.getAllInProgressByEmp( page,size,principal.getName());
    }
    // FOR ADMIN
    @GetMapping("/api/asset-request/pending-admin")
    public AssetRequestRespDto getAllPendingForAdmin(@RequestParam int page,
                                             @RequestParam int size ){
        return assetRequestService.getAllInProgressByAdmin( page,size);
    }

    @DeleteMapping("/api/asset-request/delete/{asset_request_id}")
    public void deleteAssetRequest(@PathVariable int asset_request_id){
        assetRequestService.deleteAssetRequest(asset_request_id);

    }


}
