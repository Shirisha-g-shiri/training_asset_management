package com.app.model;

import com.app.enums.Status;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;

@Entity
@Getter
@Setter
public class AssetRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String remarks;

    @Enumerated(EnumType.STRING)
    private Status status;

    @CreationTimestamp
    private Instant requestDate;

    @ManyToOne
    private Employee employee;

    @ManyToOne
    private Asset asset;

    @ManyToOne
    private Admin admin;
}
