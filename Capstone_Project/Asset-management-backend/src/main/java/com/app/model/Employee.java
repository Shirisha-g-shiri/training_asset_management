package com.app.model;

import com.app.enums.Department;
import com.app.enums.Gender;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Entity
@Getter
@Setter
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(nullable = false)
    private String name;
    @Enumerated(EnumType.STRING)
    private Gender gender;

    private String mobileNo;
    private String address;
    private String email;

    @Enumerated(EnumType.STRING)
    private Department department;

    private String bloodGroup;
    private Instant dateOfBirth;
    private Instant dateOfJoining;


    @OneToOne
    private User user;
}
