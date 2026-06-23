package com.app.controller;

import com.app.dto.ChangePasswordDto;
import com.app.dto.LoginResponseDto;
import com.app.dto.TokenDto;
import com.app.enums.Department;
import com.app.enums.Role;
import com.app.model.Admin;
import com.app.model.Employee;
import com.app.model.User;
import com.app.service.AdminService;
import com.app.service.EmployeeService;
import com.app.service.UserService;
import com.app.utility.JwtUtility;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {


    private final UserService userService;
    private final EmployeeService employeeService;
    private final AdminService adminService;
    private final JwtUtility jwtUtility;

//    @GetMapping("/login")
//    public LoginResponseDto login(Principal principal){
//        String loggedInUsername = principal.getName();
//        User user =  (User)userService.loadUserByUsername(loggedInUsername);
//        return new LoginResponseDto(user.getId(),
//                user.getUsername(),
//                user.getRole().toString());
//    }

    @GetMapping("/login")
    public TokenDto login(Principal principal){
        String username = principal.getName();
        String token = jwtUtility.generateToken(username);
        return new TokenDto(username,token);
    }

    // this is for later
    @GetMapping("/user-details")
    public LoginResponseDto getUserDetails(Principal principal){
        User user = (User)userService.loadUserByUsername(principal.getName());
        String name = "";
        String email = "";
        Department department=null;
        Boolean isFirstTime = user.isFirstTime();
        if(Role.ADMIN.equals(user.getRole())){
            Admin admin = adminService.getAdminByUserName(user);
            name = admin.getName();
            email = admin.getEmail();
            department = Department.ASSET_MANAGEMENT;
        } else if (Role.EMPLOYEE.equals(user.getRole())) {
            Employee employee = employeeService.getByUsername(principal.getName());
            name = employee.getName();
            email = employee.getEmail();
            department = employee.getDepartment();
        }
        return new LoginResponseDto(
                user.getId(),
                user.getUsername(),
                user.getRole().toString(),
                name,
                department,
                email,
                isFirstTime

        );
    }

    @PutMapping("/employee/change-password")
    public void changePassword(@Valid @RequestBody ChangePasswordDto changePasswordDto , Principal principal){
        String employeeUsername = principal.getName();
        employeeService.changePassword(changePasswordDto,employeeUsername);
    }



}