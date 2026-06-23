package com.app.config;

import com.app.expections.FileInvalidExtensionException;
import com.app.expections.FileNotFoundException;
import com.app.expections.ResourceNotFoundException;
import com.app.utility.ResponseUtility;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@ControllerAdvice
@AllArgsConstructor
public class GlobalExceptionHandler {



    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);
    private ResponseUtility responseUtility;

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ResponseUtility> handleResourceNotFoundException(
            ResourceNotFoundException e
    ){
        responseUtility.setMessage(e.getMessage());
        return ResponseEntity
                .badRequest()
                .body(responseUtility);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String,String>> handleMethodArgumentNotValidException(
            MethodArgumentNotValidException e , Principal principal
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



    @ExceptionHandler(FileNotFoundException.class)
    public ResponseEntity<ResponseUtility> handleFileNotFoundException(
            FileNotFoundException e
    ){
        responseUtility.setMessage(e.getMessage());
        return ResponseEntity
                .badRequest()
                .body(responseUtility);
    }

    @ExceptionHandler(IOException.class)
    public ResponseEntity<ResponseUtility> handleIOException(
            IOException e
    ){
        responseUtility.setMessage(e.getMessage());
        return ResponseEntity
                .badRequest()
                .body(responseUtility);
    }

    @ExceptionHandler(FileInvalidExtensionException.class)
    public ResponseEntity<ResponseUtility> handleFileInvalidExtensionException(
            FileInvalidExtensionException e
    ){
        responseUtility.setMessage(e.getMessage());
        return ResponseEntity
                .badRequest()
                .body(responseUtility);
    }
}