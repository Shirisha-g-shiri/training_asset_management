package com.app.service;

import com.app.dto.AssetServiceByEmpDto;
import com.app.dto.AssetServiceDto;
import com.app.dto.AssetServiceRespDto;
import com.app.enums.Status;
import com.app.expections.ResourceNotFoundException;
import com.app.mapper.AssetServiceMapper;
import com.app.model.*;
import com.app.model.AssetService;
import com.app.repository.AssetServiceRepository;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class AssetServiceService {
    private final AssetServiceRepository assetServiceRepository;
    private final AssetServiceMapper assetServiceMapper;
    private final com.app.service.AssetService assetService;
    private final EmployeeService employeeService;
    private final AdminService adminService;
    private final UserService userService;

    public AssetServiceRespDto getAllWithPagination(int page, int size) {
        Pageable pageable = PageRequest.of(page,size);
        Page<AssetService> pages =  assetServiceRepository.findAll(pageable);
        return assetServiceMapper.mapEntityTODto(pages);
    }

    public void insert(@Valid AssetServiceDto assetServiceDto, int assetId, String employeeUsername) {
        Asset asset = assetService.getById(assetId);
        Employee employee = employeeService.getByUsername(employeeUsername);
        com.app.model.AssetService assetService = assetServiceMapper.mapDtoToEntity(assetServiceDto);
        assetService.setStatus(Status.IN_PROGRESS);
        assetService.setAsset(asset);
        assetService.setEmployee(employee);
        assetServiceRepository.save(assetService);
    }

    public void update(Status status, int assetServiceId, String adminUsername) {
        AssetService assetService = getById(assetServiceId);
        User user =userService.getByUsername(adminUsername);
        Admin admin = adminService.getAdminByUserName(user);
        assetService.setStatus(status);
        assetService.setAdmin(admin);
        assetServiceRepository.save(assetService);
    }

    public AssetService getById(int id) {
        return assetServiceRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Invalid Asset Service Id !!"));
    }


    public List<AssetServiceByEmpDto> getForEmployee(String employeeUsername) {
        Employee employee = employeeService.getByUsername(employeeUsername);
        List<AssetService> list = assetServiceRepository.getAllByEmployee(employee.getId());
        return list.stream()
                .map(assetServiceMapper::mapEntityTODtoByEmp)
                .toList();
    }


    public void delete(int assetServiceId) {
        getById(assetServiceId);
        assetServiceRepository.deleteById(assetServiceId);
    }
}
