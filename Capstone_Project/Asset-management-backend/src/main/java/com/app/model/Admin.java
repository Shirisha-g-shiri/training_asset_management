package com.app.model;

import com.app.enums.AdminRole;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String name;

    private String email;

    @Enumerated(EnumType.STRING)
    private AdminRole adminRole;
    @OneToOne
    private User user;

}
