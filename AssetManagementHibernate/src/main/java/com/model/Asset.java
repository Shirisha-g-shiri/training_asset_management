package com.model;

import com.enums.AssetStatus;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
@Entity
public class Asset {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String model;
    private String name;

    @Enumerated(EnumType.STRING)
    private AssetStatus asset_status;
    @CreationTimestamp
    private Instant manufacturing_date;

    @CreationTimestamp
    private Instant expiry_date;

    @CreationTimestamp
    @Column(updatable = false)
    private Instant created_at;

    @UpdateTimestamp
    private Instant updated_at;
    @ManyToOne
    private Hr hr;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public AssetStatus getAsset_status() {
        return asset_status;
    }

    public void setAsset_status(AssetStatus asset_status) {
        this.asset_status = asset_status;
    }

    public Instant getManufacturing_date() {
        return manufacturing_date;
    }

    public void setManufacturing_date(Instant manufacturing_date) {
        this.manufacturing_date = manufacturing_date;
    }

    public Instant getExpiry_date() {
        return expiry_date;
    }

    public void setExpiry_date(Instant expiry_date) {
        this.expiry_date = expiry_date;
    }

    public Instant getCreated_at() {
        return created_at;
    }

    public void setCreated_at(Instant created_at) {
        this.created_at = created_at;
    }

    public Instant getUpdated_at() {
        return updated_at;
    }

    public void setUpdated_at(Instant updated_at) {
        this.updated_at = updated_at;
    }

    public Hr getHr() {
        return hr;
    }

    public void setHr(Hr hr) {
        this.hr = hr;
    }

    @Override
    public String toString() {
        return "Asset{" +
                "id=" + id +
                ", model='" + model + '\'' +
                ", name='" + name + '\'' +
                ", asset_status=" + asset_status +
                ", manufacturing_date=" + manufacturing_date +
                ", expiry_date=" + expiry_date +
                ", created_at=" + created_at +
                ", updated_at=" + updated_at +
                ", hr=" + hr +
                '}';
    }
}
