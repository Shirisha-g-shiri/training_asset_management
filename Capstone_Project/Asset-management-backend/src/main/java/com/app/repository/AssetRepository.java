package com.app.repository;

import com.app.enums.AssetStatus;
import com.app.model.Asset;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssetRepository extends JpaRepository<Asset,Integer> {
    List<Asset> findByAssetStatus(AssetStatus assetStatus);


    @Query("""
        SELECT count(a) FROM Asset a
    """)
    Long getAllAssetCount();

    Page<Asset> findByStockGreaterThan(int i, Pageable pageable);

    Page<Asset> findByStockLessThanEqual(int i, Pageable pageable);


    Page<Asset> findByAssetCategoryId(Long categoryId, Pageable pageable);

    @Query("""
        SELECT a
        FROM Asset a
        WHERE a.assetCategory.id = ?1
        AND a.stock > ?2
    """)
    Page<Asset> getByAssetCategoryIdAndStockGreaterThan(Long categoryId, int i, Pageable pageable);

    @Query("""
        SELECT a
        FROM Asset a
        WHERE a.assetCategory.id = ?1
        AND a.stock <= ?2
    """)
    Page<Asset> getByAssetCategoryIdAndStockLessThanEqual(Long categoryId, int i, Pageable pageable);
}
