package com.app.service;

import com.app.dto.AdminStatDto;
import com.app.dto.ChangePasswordDto;
import com.app.dto.EmployeeDto;
import com.app.dto.EmployeeReqDto;
import com.app.enums.Role;
import com.app.expections.ResourceNotFoundException;
import com.app.model.Employee;
import com.app.repository.AssetAllocationRepository;
import com.app.repository.AssetRequestRepository;
import com.app.repository.AssetServiceRepository;
import com.app.repository.EmployeeRepository;
import com.app.model.User;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class EmployeeService {
    private final EmployeeRepository employeeRepository;
    private final AssetRequestRepository assetRequestRepository;
    private final AssetAllocationRepository assetAllocationRepository;
    private final AssetServiceRepository assetServiceRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserService userService;

    public Employee getById(int id) {
        return employeeRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Invalid Employee Id !!"));
    }
    public void postEmployee(EmployeeReqDto employeeReqDto) {
        String username = employeeReqDto.username();
        String password = employeeReqDto.password();
        Role role = Role.EMPLOYEE;

        String encodedPassword = passwordEncoder.encode(password);
        User user = new User();
        user.setUsername(username);
        user.setPassword(encodedPassword);
        user.setRole(role);
        user = userService.save(user);
        Employee employee= new Employee();
        employee.setName(employeeReqDto.name());
        employee.setMobileNo(employeeReqDto.mobile_no());
        employee.setAddress(employeeReqDto.address());
        employee.setEmail(employeeReqDto.email());
        employee.setGender(employeeReqDto.gender());
        employee.setDepartment(employeeReqDto.department());
        employee.setBloodGroup(employeeReqDto.bloodGroup());
        employee.setDateOfBirth(employeeReqDto.dateOfBirth());
        employee.setDateOfJoining(employeeReqDto.dateOfJoining());
        employee.setUser(user);
        employeeRepository.save(employee);
    }

    public List<Employee> getAll() {
        return  employeeRepository.findAll();
    }

    public void changePassword(ChangePasswordDto changePasswordDto, String employeeUsername) {
        User user = userService.getByUsername(employeeUsername);
        user.setFirstTime(true);
        userService.save(user);
        if(!passwordEncoder.matches(changePasswordDto.oldPassword(),user.getPassword())) {
            throw new ResourceNotFoundException("Invalid old password");
        }

        if(!changePasswordDto.newPassword().equals(changePasswordDto.confirmPassword())) {
            throw new ResourceNotFoundException("New password and confirm password do not match");
        }

        user.setPassword(passwordEncoder.encode(changePasswordDto.newPassword()));

        userService.save(user);
    }

    public Employee getByUsername(String employeeUsername) {
        return  employeeRepository.findByUserUsername(employeeUsername);
    }


    public List<EmployeeDto> getAllWithAsset() {
        return employeeRepository.getAllWithAsset();
    }

    public AdminStatDto getCombinedStats(String username) {
        Employee employee = getByUsername(username);
        Long listAssetRequestApprove = assetAllocationRepository.getAllApprovedCountByEmp(employee.getId());
        Long listAssetRequestPending = assetRequestRepository.getAllInProgressCountByEmp(employee.getId());
        Long listAssetService = assetServiceRepository.getAllInProgressCountByEmp(employee.getId());

        List<String> label = List.of("Total Asset Assigned",  "Pending Request","Pending Service Request");
        List<Long> count = List.of( listAssetRequestApprove ,  listAssetRequestPending,  listAssetService);

        return new AdminStatDto(label,count);

    }
}
