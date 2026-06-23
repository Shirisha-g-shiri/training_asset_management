package com.main.model;

import com.main.enums.AssetStatus;

import java.time.Instant;

public class Asset {
    private int id;
    private AssetStatus assetStatus;
    private String model;
    private String name;
    private Instant manufacturingDate;
    private Instant expiryDate;

    public Asset(){

    }
    public Asset(int id, AssetStatus assetStatus, String model, String name, Instant manufacturingDate, Instant expiryDate) {
        this.id = id;
        this.assetStatus = assetStatus;
        this.model = model;
        this.name = name;
        this.manufacturingDate = manufacturingDate;
        this.expiryDate = expiryDate;
    }

    public Asset(int id, AssetStatus assetStatus, String model, String name) {
        this.id = id;
        this.assetStatus = assetStatus;
        this.model = model;
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public AssetStatus getAssetStatus() {
        return assetStatus;
    }

    public void setAssetStatus(AssetStatus assetStatus) {
        this.assetStatus = assetStatus;
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

    public Instant getManufacturingDate() {
        return manufacturingDate;
    }

    public void setManufacturingDate(Instant manufacturingDate) {
        this.manufacturingDate = manufacturingDate;
    }

    public Instant getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(Instant expiryDate) {
        this.expiryDate = expiryDate;
    }

    @Override
    public String toString() {
        return "Asset{" +
                "id=" + id +
                ", assetStatus=" + assetStatus +
                ", model='" + model + '\'' +
                ", name='" + name + '\'' +
                ", manufacturingDate=" + manufacturingDate +
                ", expiryDate=" + expiryDate +
                '}';
    }
}
