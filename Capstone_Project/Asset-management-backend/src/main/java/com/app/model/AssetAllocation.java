package com.app.model;

import com.app.enums.AllocationStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;

@Entity
@Getter
@Setter
public class AssetAllocation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Enumerated(EnumType.STRING)
    private AllocationStatus status;

    @CreationTimestamp
    @Column(nullable = false,updatable = false)
    private Instant allocatedDate;

    private String remarks;
    private Instant returnDate;

    @ManyToOne
    private AssetRequest assetRequest;

    @ManyToOne
    private Asset asset;

    @ManyToOne
    private Employee employee;

    @ManyToOne
    private Admin admin;
}
