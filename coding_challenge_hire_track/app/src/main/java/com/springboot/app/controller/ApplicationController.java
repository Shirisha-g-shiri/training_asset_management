package com.springboot.app.controller;

import com.springboot.app.dto.ApplicationRespDto;
import com.springboot.app.dto.ApplicationRespForEmployeerDto;
import com.springboot.app.dto.ApplicationRespWithTotalPageDto;
import com.springboot.app.service.ApplicationService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@AllArgsConstructor
public class ApplicationController {
    private final ApplicationService applicationService;

    @PostMapping("/api/application/add/{job_id}")
    public void addApplication(@PathVariable int job_id, Principal principal){
        applicationService.addApplication(job_id,principal.getName());
    }

    @GetMapping("/api/my-applications")
    public List<ApplicationRespDto> getMyApplication(@RequestParam(defaultValue = "0",required = false) int page,
                                              @RequestParam(defaultValue = "10",required = false) int size,
                                              Principal principal){
        return applicationService.getMyApplication(page,size,principal.getName());
    }

    @GetMapping("/api/applications-for-employer")
    public List<ApplicationRespForEmployeerDto> getApplicationForEmployee(@RequestParam(defaultValue = "0",required = false) int page,
                                                                          @RequestParam(defaultValue = "10",required = false) int size,
                                                                          Principal principal){
        return applicationService.getApplicationForEmployee(page,size,principal.getName());
    }

    //    to get total pages and total record
    @GetMapping("/api/my-applications/with-total-pages")
    public ApplicationRespWithTotalPageDto getMyApplicationWithTotalPages(@RequestParam(defaultValue = "0",required = false) int page,
                                                                                @RequestParam(defaultValue = "10",required = false) int size,
                                                                                Principal principal){
        return applicationService.getMyApplicationWithTotalPages(page,size,principal.getName());
    }


}
