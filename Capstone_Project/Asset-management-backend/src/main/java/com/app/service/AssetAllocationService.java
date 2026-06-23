package com.app.service;

import com.app.dto.AssetAllocationByEmpDto;
import com.app.dto.AssetAllocationDto;
import com.app.dto.AssetAllocationRespDto;
import com.app.enums.AllocationStatus;
import com.app.enums.Status;
import com.app.expections.ResourceNotFoundException;
import com.app.mapper.AssetAllocationMapper;
import com.app.model.*;
import com.app.repository.AssetAllocationRepository;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@AllArgsConstructor
public class AssetAllocationService {
    private final AssetAllocationRepository assetAllocationRepository;
    private final AssetAllocationMapper assetAllocationMapper;
    private final AssetRequestService assetRequestService;
    private final AdminService adminService;
    private final UserService userService;
    private final EmployeeService employeeService;
    public AssetAllocationRespDto getAllWithPagination(int page, int size) {
        Pageable pageable = PageRequest.of(page,size);
        Page<AssetAllocation> pages =  assetAllocationRepository.findAll(pageable);
        return assetAllocationMapper.mapEntityTODto(pages);
    }

    public void insert(@Valid AssetAllocationDto assetAllocationDto, int requestId, String adminUsername) {
        User user = userService.getByUsername(adminUsername);
        Admin admin = adminService.getAdminByUserName(user);

        AssetRequest assetRequest = assetRequestService.getById(requestId);
        if(assetRequest.getStatus() == Status.REJECTED) {
            throw new ResourceNotFoundException("Request is rejected. Asset cannot be allocated.");
        }
        assetRequest.setStatus(Status.APPROVED);
        assetRequest.setAdmin(admin);
        assetRequestService.updateApprove(assetRequest);

        Employee employee = assetRequest.getEmployee();
        Asset asset = assetRequest.getAsset();

        AssetAllocation assetAllocation = assetAllocationMapper.mapDtoToEntity(assetAllocationDto);
        assetAllocation.setStatus(AllocationStatus.ALLOCATED);
        assetAllocation.setAssetRequest(assetRequest);
        assetAllocation.setAdmin(admin);
        assetAllocation.setAsset(asset);
        assetAllocation.setEmployee(employee);
        assetAllocationRepository.save(assetAllocation);
    }


    public AssetAllocation getById(int id) {
        return assetAllocationRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Invalid Asset Allocation id !!."));
    }

    public void update(Instant returnDate, int assetAllocationId, String employeeUsername) {
        Employee employee = employeeService.getByUsername(employeeUsername);
        AssetAllocation assetAllocation = getById(assetAllocationId);
        if(employee.getId() != (assetAllocation.getEmployee().getId())){
            throw new ResourceNotFoundException("This asset is not allocated to the logged-in employee");
        }
        assetAllocation.setReturnDate(returnDate);
        assetAllocationRepository.save(assetAllocation);
    }

    public List<AssetAllocationByEmpDto> getAllByEmployee(int employeeId) {
        List<AssetAllocation> list = assetAllocationRepository.getAllByEmployee(employeeId);
        return list.stream()
                .map(assetAllocationMapper::mapEntityTODtoByEmp)
                .toList();
    }

    public List<AssetAllocationByEmpDto> getAllForEmplpoyee(String employeeUsername) {
        Employee employee = employeeService.getByUsername(employeeUsername);
        List<AssetAllocation> list = assetAllocationRepository.getAllByEmployee(employee.getId());
        return list.stream()
                .map(assetAllocationMapper::mapEntityTODtoByEmp)
                .toList();
    }
}
