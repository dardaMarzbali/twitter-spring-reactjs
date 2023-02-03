package com.gmail.merikbest2015.feign;

import com.gmail.merikbest2015.configuration.FeignConfiguration;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import static com.gmail.merikbest2015.controller.PathConstants.API_V1_IMAGE;

@FeignClient(name = "image-service", configuration = FeignConfiguration.class)
public interface ImageClient {
    
    @PostMapping(API_V1_IMAGE + "/upload")
    String uploadImage(@RequestPart("file") MultipartFile file);
}