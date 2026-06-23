package com.app.repository;

import com.app.model.AssetCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AssetCategoryRepository extends JpaRepository<AssetCategory,Integer> {
}
