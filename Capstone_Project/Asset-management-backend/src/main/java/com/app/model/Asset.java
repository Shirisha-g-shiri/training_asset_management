package com.app.model;

import com.app.enums.AssetStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
@Entity
@Getter
@Setter
public class Asset {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false,unique = true)
    private String assetNo;
    private String model;
    private String name;

    private Double value;
    @Enumerated(EnumType.STRING)
    private AssetStatus assetStatus;


    @CreationTimestamp
    @Column(updatable = false)
    private Instant manufacturingDate;

    @CreationTimestamp
    @Column(updatable = false)
    private Instant expiryDate;



    @CreationTimestamp
    @Column(updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    private Instant updatedAt;

    @ManyToOne
    private AssetCategory assetCategory;

    @ManyToOne
    private Admin admin;

    @Column(nullable = false)
    private int stock;

    private String idPath;
}
