package com.app.dao;

import com.app.model.Asset;

import java.util.List;

public interface AssetDao {
    List<Asset> getAllAsset(String username);
    void save(Asset asset, String username);
    Asset getById(int id, String hrUsername);
    void update(Asset asset);
    void deleteById(Asset asset);
}
