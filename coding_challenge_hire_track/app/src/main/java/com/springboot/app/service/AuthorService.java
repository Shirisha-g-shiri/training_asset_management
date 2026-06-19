package com.springboot.app.service;

import com.springboot.app.exceptions.ResourceNotFoundException;
import com.springboot.app.model.Author;
import com.springboot.app.repository.AuthorRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AuthorService {
    private final AuthorRepository authorRepository;
    public Author getById(int authorId) {
        return authorRepository.findById(authorId)
                .orElseThrow(()->new ResourceNotFoundException("Invalid author id"));
    }
}
