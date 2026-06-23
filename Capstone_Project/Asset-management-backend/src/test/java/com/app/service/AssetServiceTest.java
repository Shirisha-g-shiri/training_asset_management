package com.app.service;

import com.app.dto.AssetDto;
import com.app.enums.AdminRole;
import com.app.enums.AssetStatus;
import com.app.enums.Role;
import com.app.expections.ResourceNotFoundException;
import com.app.model.Admin;
import com.app.model.Asset;
import com.app.model.AssetCategory;
import com.app.model.User;
import com.app.repository.AdminRepository;
import com.app.repository.AssetCategoryRepository;
import com.app.repository.AssetRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
 class AssetServiceTest {

    @Mock
    private AssetRepository assetRepository;
    @Mock
    private AssetCategoryRepository assetCategoryRepository;
    @Mock
    private AdminRepository adminRepository;


    @InjectMocks
    private AssetService assetService;

    private Asset asset;
    private Asset asset2;
    private AssetCategory category;
    private User user;
    private Admin admin;



    @BeforeEach
     void sampleData(){
        asset = new Asset();
        asset.setId(1);
        asset.setAssetNo("ASSET-001");
        asset.setName("laptops");
        asset.setModel("hp");
        asset.setValue(200.00);
        asset.setAssetStatus(AssetStatus.AVAILABLE);
        asset.setStock(10);

        asset2 = new Asset();
        asset2.setId(2);
        asset2.setAssetNo("ASSET-002");
        asset2.setName("System");
        asset2.setModel("dell");
        asset2.setValue(400.00);
        asset2.setAssetStatus(AssetStatus.AVAILABLE);
        asset2.setStock(15);

        category = new AssetCategory();
        category.setId(1);
        category.setName("laptop");

        user = new User();
        user.setId(1);
        user.setUsername("john");
        user.setRole(Role.ADMIN);

        admin = new Admin();
        admin.setId(1);
        admin.setName("john");
        admin.setAdminRole(AdminRole.EXECUTIVE);

    }

    @Test
     void getAllAssetReturnSomething(){
        when(assetRepository.findAll()).thenReturn(List.of(asset,asset2));
        List<Asset> actualCall = assetService.getAll();

        assertThat(actualCall).hasSize(2);
        assertThat(actualCall.getFirst().getName()).isEqualToIgnoringCase("laptops");
        assertThat(actualCall.get(0).getModel()).isEqualToIgnoringCase("hp");

        verify(assetRepository, times(1)).findAll();
    }

    @Test
     void getAllAssetReturnEmpty(){
        when(assetRepository.findAll()).thenReturn(List.of());
        List<Asset> actualCall = assetService.getAll();

        assertThat(actualCall).isEmpty();

        verify(assetRepository, times(1)).findAll();
    }

    @Test
     void getByIdReturnAsset(){
        when(assetRepository.findById(1)).thenReturn(Optional.of(asset));
        when(assetRepository.findById(200)).thenReturn(Optional.of(asset2));

        Asset actualCall = assetService.getById(1);
        assertThat(actualCall.getName()).isEqualToIgnoringCase("laptops");

        assertThat(assetService.getById(200).getName()).isEqualToIgnoringCase("System");

        verify(assetRepository, times(1)).findById(1);
    }

    @Test
     void getByIdReturnEmpty(){
        when(assetRepository.findById(2089)).thenReturn(Optional.empty());

        assertThatThrownBy(()-> assetService.getById(2089))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessage("Invalid Asset Id !!");

        verify(assetRepository, times(1)).findById(2089);
    }

//    @Test
//    public void getAllWithPagination(){
//        Pageable pageable = PageRequest.of(0,2);
//        Page<Asset> page = new PageImpl<>(List.of(asset, asset2));
//        when(assetRepository.findAll(pageable)).thenReturn(page);
//        AssetRespDto actualCall = assetService.getAllWithPagination(0,2, status, sort,categoryId);
//
//        assertThat(actualCall.totalRecords()).isEqualTo(2);
//
//        verify(assetRepository, times(1)).findAll(pageable);
//    }


    @Test
     void addAssetReturnAsset(){
        when(assetCategoryRepository.findById(1)).thenReturn(Optional.of((category)));
        when(adminRepository.getAdminByUserName("john")).thenReturn(admin);

        when(assetRepository.save(any(Asset.class))).thenReturn(asset);

        AssetDto dto = new AssetDto(AssetStatus.AVAILABLE,"laptops","ASSET-001",200.00,"hp",10, null ,null);

        Asset actualData = assetService.insert(dto,1,"john");
        assertThat(actualData.getName()).isEqualToIgnoringCase("laptops");
    }

    @Test
    void deleteAsset_mustDeleteAndReturnNothing(){
        when(assetRepository.findById(100)).thenReturn(Optional.of(asset));

        // When thenReturn does not work in void method tests
        doNothing().when(assetRepository).deleteById(100);
        assetService.delete(100);

        // Check if repo call happens only once
        verify(assetRepository, times(1)).deleteById(100);
        verify(assetRepository, times(1)).findById(100);
    }


}
