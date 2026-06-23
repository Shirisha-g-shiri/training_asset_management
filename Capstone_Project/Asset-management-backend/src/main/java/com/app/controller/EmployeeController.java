package com.app.controller;

import com.app.dto.AdminStatDto;
import com.app.dto.EmployeeDto;
import com.app.model.Employee;
import com.app.service.EmployeeService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class EmployeeController {
    private final EmployeeService employeeService;

    @GetMapping("/api/employee/all")
    public List<Employee> getAll(){
        return employeeService.getAll();
    }

    //employee with asset
    @GetMapping("/api/employee/with-asset")
    public List<EmployeeDto> getAllWithAsset(){

        return employeeService.getAllWithAsset();
    }

    @GetMapping("/api/employee/get-one/{id}")
    public ResponseEntity<Object> getById(@PathVariable int id){
        Employee employee = employeeService.getById(id);
        return ResponseEntity.ok().body(employee);
    }

    @GetMapping("/api/employee/get")
    public ResponseEntity<Object> getByEmpLogin(Principal principal){
        String employeeUsername = principal.getName();
        Employee employee = employeeService.getByUsername(employeeUsername);
        return ResponseEntity.ok().body(employee);
    }

    @GetMapping("/api/employee/stats")
    public AdminStatDto getCombinedStats(Principal principal){
        return employeeService.getCombinedStats(principal.getName());
    }

}
