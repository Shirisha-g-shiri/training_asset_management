package com.app.controller;

import com.app.dto.AdminStatDto;
import com.app.dto.EmployeeReqDto;
import com.app.service.AdminService;
import com.app.service.EmployeeService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;


@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {
    private final EmployeeService employeeService;
    private final AdminService adminService;
    @PostMapping("/api/auth/employee/add")
    public void postEmployee(@RequestBody EmployeeReqDto employeeReqDto){
        employeeService.postEmployee(employeeReqDto);
    }

    @GetMapping("/api/admin/stats")
    public AdminStatDto getCombinedStats(){
        return adminService.getCombinedStats();
    }
}
