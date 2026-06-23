package com.app.service;

import com.app.expections.ResourceNotFoundException;
import com.app.model.User;
import com.app.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
@AllArgsConstructor
public class UserService implements UserDetailsService {
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);


    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        logger.info("Fetching user details by given username {}", username);
        User user =  userRepository.findByUsername(username)
                .orElseThrow(()-> new UsernameNotFoundException("Invalid Credentials"));
        logger.info("User Details fetched for user {}", user.getUsername());

        return user;
    }

    public User getByUsername(String officerUsername) {
        return userRepository.findByUsername(officerUsername)
                .orElseThrow(()-> new ResourceNotFoundException("Invalid User."));
    }

    public User save(User user) {
        return userRepository.save(user);
    }
}
