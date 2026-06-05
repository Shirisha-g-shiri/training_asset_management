package com.springboot.app.controller;

import com.springboot.app.dto.BookCreationDto;
import com.springboot.app.service.BookService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class BookController {
    private final BookService bookService;

    @PostMapping("/api/book/add/{author_id}")
    public void addBook(@Valid @RequestBody BookCreationDto dto , @PathVariable int author_id){
        bookService.addBook(dto,author_id);

    }


}
