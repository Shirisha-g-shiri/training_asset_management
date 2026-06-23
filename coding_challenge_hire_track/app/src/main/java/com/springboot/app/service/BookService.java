package com.springboot.app.service;

import com.springboot.app.dto.BookCreationDto;
import com.springboot.app.mapper.BookMapper;
import com.springboot.app.model.Author;
import com.springboot.app.model.Book;
import com.springboot.app.repository.BookRepository;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class BookService {
    private final BookRepository bookRepository;
    private final AuthorService authorService;
    private final BookMapper bookMapper;
    public void addBook(@Valid BookCreationDto dto, int authorId) {
        Author author = authorService.getById(authorId);
        Book book = bookMapper.mapDtoToEntity(dto);
        book.setAuthor(author);
        bookRepository.save(book);
    }
}
