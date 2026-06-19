package com.springboot.app.model;

import com.springboot.app.enums.Degree;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class JobSeeker {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false,length = 1000)
    private String resumeSummary;

    private int age;

    @Enumerated(EnumType.STRING)
    private Degree degree;

    @OneToOne
    private User user;

}
