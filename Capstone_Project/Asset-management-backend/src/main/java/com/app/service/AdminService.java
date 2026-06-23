package com.app.service;

import com.app.dto.AdminStatDto;
import com.app.expections.ResourceNotFoundException;
import com.app.model.*;
import com.app.repository.*;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class AdminService {
    private final AdminRepository adminRepository;
    private final AssetRepository assetRepository;
    private final EmployeeRepository employeeRepository;
    private final AssetRequestRepository assetRequestRepository;
    private final AssetServiceRepository assetServiceRepository;
    public Admin getById(int adminId) {
        return adminRepository.findById(adminId)
                .orElseThrow(()-> new ResourceNotFoundException("Invalid Admin Id !!"));

    }

    public Admin getAdminByUserName(User user) {
        return adminRepository.findByUser(user);
    }

    public AdminStatDto getCombinedStats() {
        Long listAsset = assetRepository.getAllAssetCount();
        Long listEmployee = employeeRepository.getAllEmpCount();
        Long listAssetRequest = assetRequestRepository.getAllInProgressCount();
        Long listAssetService = assetServiceRepository.getAllInProgressCount();

        List<String> label = List.of("Total Asset", "Employee", "Pending Request","UnRepair Asset");
        List<Long> count = List.of( listAsset,  listEmployee ,  listAssetRequest,  listAssetService);

        return new AdminStatDto(label,count);
    }
}
