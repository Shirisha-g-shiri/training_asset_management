package com.springboot.app.service;

import com.springboot.app.dto.EmployerRegisterDto;
import com.springboot.app.enums.Role;
import com.springboot.app.model.Employer;
import com.springboot.app.model.User;
import com.springboot.app.repository.EmployerRepository;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class EmployerService {
    private final EmployerRepository employerRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserService userService;

    public void addEmployer(@Valid EmployerRegisterDto dto) {
        String username = dto.username();
        String password = dto.password();
        Role role = Role.EMPLOYER;
        String encodedPassword = passwordEncoder.encode(password);

        User user = new User();
        user.setUsername(username);
        user.setPassword(encodedPassword);
        user.setRole(role);
        user = userService.save(user);


        Employer employer= new Employer();
        employer.setCompanyName(dto.companyName());
        employer.setUser(user);
        employerRepository.save(employer);
    }

    public Employer getEmployerByUsername(String name) {
        return employerRepository.findByUserUsername(name);
    }
}
