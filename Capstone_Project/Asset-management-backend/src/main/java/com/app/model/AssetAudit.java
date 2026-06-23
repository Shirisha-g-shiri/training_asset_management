package com.app.model;

import com.app.enums.Status;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;

@Entity
@Getter
@Setter
public class AssetAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Enumerated(EnumType.STRING)
    private Status status;

    private String remarks;

    @CreationTimestamp
    @Column(nullable = false,updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    private Instant updatedAt;

    @ManyToOne
    private Asset asset;

    @ManyToOne
    private Employee employee;

    @ManyToOne
    private Admin admin;
}
