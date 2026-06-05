package com.springboot.app.controller;

import com.springboot.app.dto.EmployerRegisterDto;
import com.springboot.app.service.EmployerService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class EmployerController {
    private final EmployerService employerService;

    @PostMapping("/api/auth/register/employer")
    public void addEmployer(@Valid @RequestBody EmployerRegisterDto dto){
        employerService.addEmployer(dto);
    }
}
