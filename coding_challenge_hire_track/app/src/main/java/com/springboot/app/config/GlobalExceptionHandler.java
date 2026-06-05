package com.springboot.app.config;


//import com.springboot.app.exceptions.ResourceNotFoundException;
import com.springboot.app.utility.ResponseUtility;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.lang.module.ResolutionException;
import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@ControllerAdvice
@AllArgsConstructor
public class GlobalExceptionHandler {



    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);
    private ResponseUtility responseUtility;

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String,String>> handleMethodArgumentNotValidException(
            MethodArgumentNotValidException e, Principal principal
            ){
        logger.warn("Validation failed for user {} ", principal.getName() );
        BindingResult bindingResult = e.getBindingResult();
        List<FieldError> errors = bindingResult.getFieldErrors();
        Map<String,String> map= new HashMap<>();
        for(FieldError error : errors){
            map.put(error.getField(),error.getDefaultMessage());
            logger.error("Field {} - message: {}", error.getField(), error.getDefaultMessage());
        }
        return ResponseEntity
                .badRequest()
                .body(map);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Object> handleResourceNotFountexception(
            ResolutionException e
    ){
        responseUtility.setMessage(e.getMessage());
        return ResponseEntity.badRequest().body(responseUtility);
    }


}