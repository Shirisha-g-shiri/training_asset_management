package com.springboot.app.config;

import com.springboot.app.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@AllArgsConstructor
public class SecurityConfig {
    private final UserService userService;
    private final JwtFilter jwtFilter;

//    @Bean
//    public UserDetailsService users() {
//        UserDetails user1 = User.builder()
//                .username("john_doe")
//                .password("{noop}password123")
//                .roles("OFFICER")
//                .build();
//        UserDetails user2 = User.builder()
//                .username("john_admin")
//                .password("{noop}john_123")
//                .roles("STATION_HEAD")
//                .build();
//        return new InMemoryUserDetailsManager(user1, user2);
//    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(authorize -> authorize
                                .requestMatchers(HttpMethod.POST, "/api/auth/register/employer").permitAll()
                                .requestMatchers(HttpMethod.POST, "/api/auth/register/seeker").permitAll()
                                .requestMatchers(HttpMethod.GET, "/api/auth/login").authenticated()

                                .requestMatchers(HttpMethod.POST, "/api/jobs").hasAuthority("EMPLOYER")
                                .requestMatchers(HttpMethod.GET, "/api/jobs").hasAnyAuthority("EMPLOYER","SEEKER")

                                .requestMatchers(HttpMethod.POST, "/api/application/add/{job_id}").hasAuthority("SEEKER")
                                .requestMatchers(HttpMethod.POST, "/api/my-applications").hasAuthority("SEEKER")
                                .requestMatchers(HttpMethod.POST, "/api/applications-for-employer").hasAuthority("EMPLOYER")
                                .anyRequest().authenticated()
                );
        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
        http.httpBasic(Customizer.withDefaults());
        return http.build();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider dao = new DaoAuthenticationProvider(userService);
        dao.setPasswordEncoder(passwordEncoder());
        return dao;
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

}
