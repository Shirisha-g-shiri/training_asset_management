package com.app.service;

import com.app.dto.AssetCategoryDto;
import com.app.dto.AssetCategoryRespDto;
import com.app.enums.AdminRole;
import com.app.enums.Role;
import com.app.expections.ResourceNotFoundException;
import com.app.model.Admin;
import com.app.model.AssetCategory;
import com.app.model.User;
import com.app.repository.AdminRepository;
import com.app.repository.AssetCategoryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
 class AssetCategoryServiceTest {
    @Mock
    private AssetCategoryRepository assetCategoryRepository;

    @Mock
    private AdminRepository adminRepository;


    @InjectMocks
    private AssetCategoryService assetCategoryService;

    private AssetCategory category;
    private User user;
    private Admin admin;

    @BeforeEach
     void sampleData(){
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
     void getAllAssetCategoryReturnSomething(){
        when(assetCategoryRepository.findAll()).thenReturn(List.of(category));
        List<AssetCategory> actualCall = assetCategoryService.getAll();

        assertThat(actualCall).hasSize(1);
        assertThat(actualCall.getFirst().getName()).isEqualToIgnoringCase("laptop");

        verify(assetCategoryRepository, times(1)).findAll();
    }

    @Test
     void getAllAssetCategoryReturnEmpty() {
        when(assetCategoryRepository.findAll()).thenReturn(List.of());
        List<AssetCategory> actualCall = assetCategoryService.getAll();

        assertThat(actualCall).isEmpty();

        verify(assetCategoryRepository, times(1)).findAll();
    }

    @Test
     void getByIdReturnAssetCategory(){
        when(assetCategoryRepository.findById(1)).thenReturn(Optional.of(category));

        AssetCategory actualCall = assetCategoryService.getById(1);
        assertThat(actualCall.getName()).isEqualToIgnoringCase("laptop");

        assertThat(actualCall.getName()).isEqualToIgnoringCase("laptop");

        verify(assetCategoryRepository, times(1)).findById(1);
    }

    @Test
     void getByIdReturnEmpty(){
        when(assetCategoryRepository.findById(2089)).thenReturn(Optional.empty());

        assertThatThrownBy(()-> assetCategoryService.getById(2089))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessage("Invalid Asset Category Id !!");

        verify(assetCategoryRepository, times(1)).findById(2089);
    }

    @Test
     void getAllWithPagination(){
        Pageable pageable = PageRequest.of(0,2);
        Page<AssetCategory> page = new PageImpl<>(List.of(category));
        when(assetCategoryRepository.findAll(pageable)).thenReturn(page);
        AssetCategoryRespDto actualCall = assetCategoryService.getAllWithPagination(0,2);

        assertThat(actualCall.totalRecords()).isEqualTo(1);

        verify(assetCategoryRepository, times(1)).findAll(pageable);
    }

    @Test
     void addAssetCategoryReturnAsset(){
        when(adminRepository.getAdminByUserName("john")).thenReturn(admin);
        when(assetCategoryRepository.save(any(AssetCategory.class))).thenReturn(category);

        AssetCategoryDto dto = new AssetCategoryDto("TEST NAME","TEST DESCRIPTION");

        AssetCategory actualData = assetCategoryService.insert(dto,"john");
        assertThat(actualData.getName()).isEqualToIgnoringCase("TEST NAME");
    }

    @Test
    void deleteAssetCategory_mustDeleteAndReturnNothing(){
        when(assetCategoryRepository.findById(100)).thenReturn(Optional.of(category));

        // When thenReturn does not work in void method tests
        doNothing().when(assetCategoryRepository).deleteById(100);
        assetCategoryService.delete(100);

        // Check if repo call happens only once
        verify(assetCategoryRepository, times(1)).deleteById(100);
        verify(assetCategoryRepository, times(1)).findById(100);
    }

}
