package com.app.service;

import com.app.dto.AssetRequestDto;
import com.app.dto.AssetRequestRespDto;
import com.app.enums.AssetStatus;
import com.app.enums.Status;
import com.app.expections.ResourceNotFoundException;
import com.app.model.*;
import com.app.repository.AssetRepository;
import com.app.repository.AssetRequestRepository;
import com.app.repository.EmployeeRepository;
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
 class AssetRequestServiceTest {
    @Mock
    private AssetRequestRepository assetRequestRepository;

    @Mock
    private AssetRepository assetRepository;

    @Mock
    private EmployeeRepository employeeRepository;

    @InjectMocks
    private AssetRequestService assetRequestService;

    private AssetRequest assetRequest;
    private Asset asset;
    private Employee employee;

    @BeforeEach
     void sampleData() {
        assetRequest = new AssetRequest();
        assetRequest.setId(1);
        assetRequest.setStatus(Status.IN_PROGRESS);
        assetRequest.setRemarks("TEST");

        asset = new Asset();
        asset.setId(1);
        asset.setAssetNo("ASSET-001");
        asset.setName("laptops");
        asset.setModel("hp");
        asset.setValue(200.00);
        asset.setAssetStatus(AssetStatus.AVAILABLE);
        asset.setStock(10);

        employee = new Employee();
        employee.setId(1);
        employee.setName("john");
    }
    @Test
     void getAllWithPagination(){
        Pageable pageable = PageRequest.of(0,2);
        Page<AssetRequest> page = new PageImpl<>(List.of(assetRequest));
        when(assetRequestRepository.findAll(pageable)).thenReturn(page);
        AssetRequestRespDto actualCall = assetRequestService.getAllWithPagination(0,2);

        assertThat(actualCall.totalRecords()).isEqualTo(1);

        verify(assetRequestRepository, times(1)).findAll(pageable);
    }


    @Test
     void addAssetRequestReturnAsset(){
        when(assetRepository.findById(1)).thenReturn(Optional.of((asset)));
        when(employeeRepository.findByUserUsername("john")).thenReturn((employee));
//
        when(assetRequestRepository.save(any(AssetRequest.class))).thenReturn(assetRequest);

        AssetRequestDto dto = new AssetRequestDto("TEST");

        AssetRequest actualData = assetRequestService.insert(dto,1,"john");
        assertThat(actualData.getRemarks()).isEqualToIgnoringCase("TEST");
    }

    @Test
     void getByIdReturnAssetRequest(){
        when(assetRequestRepository.findById(1)).thenReturn(Optional.of(assetRequest));

        AssetRequest actualCall = assetRequestService.getById(1);
        assertThat(actualCall.getRemarks()).isEqualToIgnoringCase("TEST");

        verify(assetRequestRepository, times(1)).findById(1);
    }

    @Test
     void getByIdReturnEmpty(){
        when(assetRequestRepository.findById(2089)).thenReturn(Optional.empty());

        assertThatThrownBy(()-> assetRequestService.getById(2089))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessage("Invalid Asset Request Id !!");

        verify(assetRequestRepository, times(1)).findById(2089);
    }
}
