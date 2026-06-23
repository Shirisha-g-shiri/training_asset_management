package com.app.service;

import com.app.dto.AssetRequestDto;
import com.app.dto.AssetRequestRespDto;
import com.app.enums.Status;
import com.app.expections.ResourceNotFoundException;
import com.app.mapper.AssetRequestMapper;
import com.app.model.*;
import com.app.repository.AssetRepository;
import com.app.repository.AssetRequestRepository;
import com.app.repository.AssetServiceRepository;
import com.app.repository.EmployeeRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AssetRequestService {
    private final AssetRequestRepository assetRequestRepository;
    private final AssetRequestMapper assetRequestMapper;
    private final AssetRepository assetRepository;
    private final EmployeeRepository employeeRepository;
    private final AdminService adminService;
    private final UserService userService;

    public AssetRequestRespDto getAllWithPagination(int page, int size) {
        Pageable pageable = PageRequest.of(page,size);
        Page<AssetRequest> pages =  assetRequestRepository.findAll(pageable);
        return AssetRequestMapper.mapEntityTODto(pages);
    }

    public AssetRequest insert(AssetRequestDto assetRequestDto, int assetId, String employeeUsername) {
        Asset asset = assetRepository.findById(assetId)
                .orElseThrow(()-> new ResourceNotFoundException("Invalid Asset id !!"));
        Employee employee = employeeRepository.findByUserUsername(employeeUsername);
        AssetRequest assetRequest = AssetRequestMapper.mapDtoToEntity(assetRequestDto);
        assetRequest.setStatus(Status.IN_PROGRESS);
        assetRequest.setAsset(asset);
        assetRequest.setEmployee(employee);
        assetRequestRepository.save(assetRequest);
        return assetRequest;
    }

    public AssetRequest getById(int requestId) {
        return assetRequestRepository.findById(requestId)
                .orElseThrow(()-> new ResourceNotFoundException("Invalid Asset Request Id !!"));
    }

    public void updateApprove(AssetRequest assetRequest) {
        assetRequestRepository.save(assetRequest);
    }

    public void updateReject(int assetRequestId, String adminUsername) {
        User user = userService.getByUsername(adminUsername);
        Admin admin = adminService.getAdminByUserName(user);
        AssetRequest assetRequest = getById(assetRequestId);
        assetRequest.setStatus(Status.REJECTED);
        assetRequest.setAdmin(admin);
        assetRequestRepository.save(assetRequest);
    }

    public AssetRequestRespDto getAllInProgressByEmp(int page, int size, String employeeUsername) {
        Pageable pageable = PageRequest.of(page,size);
        Page<AssetRequest> pages =  assetRequestRepository.getAllInProgressByEmp(employeeUsername,pageable);
        return AssetRequestMapper.mapEntityTODto(pages);
    }

    public AssetRequestRespDto getAllByEmpWithPagination(int page, int size, String username) {
        Pageable pageable = PageRequest.of(page,size);
        Page<AssetRequest> pages =  assetRequestRepository.getAllByEmpWithPagination(username,pageable);
        return AssetRequestMapper.mapEntityTODto(pages);
    }

    public void deleteAssetRequest(int assetRequestId) {
        getById(assetRequestId);
        assetRequestRepository.deleteById(assetRequestId);
    }

    public AssetRequestRespDto getAllInProgressByAdmin(int page, int size) {
        Pageable pageable = PageRequest.of(page,size);
        Page<AssetRequest> pages =  assetRequestRepository.getAllInProgressByAdmin(pageable);
        return AssetRequestMapper.mapEntityTODto(pages);
    }


}
