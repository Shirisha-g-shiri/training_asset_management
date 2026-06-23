package com.springboot.app.mapper;

import com.springboot.app.dto.BookCreationDto;
import com.springboot.app.model.Book;
import jakarta.validation.Valid;
import org.springframework.stereotype.Component;

@Component
public class BookMapper {
    public Book mapDtoToEntity(@Valid BookCreationDto dto) {
        Book book = new Book();
        book.setTitle(dto.title());
        book.setSummary(dto.summary());
        return book;
    }
}
