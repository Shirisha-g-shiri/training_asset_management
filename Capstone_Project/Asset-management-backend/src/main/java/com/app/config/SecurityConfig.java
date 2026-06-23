package com.app.config;

import com.app.service.UserService;
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

    private static final String ADMIN = "ADMIN";
    private static final String EMPLOYEE = "EMPLOYEE";


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors(Customizer.withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(authorize -> authorize
                                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                                .requestMatchers(HttpMethod.POST, "/api/auth/employee/add").hasAuthority(ADMIN)
                                .requestMatchers(HttpMethod.GET, "/api/auth/login").authenticated()
                                .requestMatchers(HttpMethod.GET, "/api/auth/user-details").authenticated()
                                .requestMatchers(HttpMethod.PUT, "/api/auth/employee/change-password").authenticated()

//                                  ADMIN
                                .requestMatchers(HttpMethod.GET, "/api/admin/stats").hasAuthority(ADMIN)


//                                ASSET CATEGORY API
                                .requestMatchers(HttpMethod.POST, "/api/asset-category/add").hasAuthority(ADMIN)
                                .requestMatchers(HttpMethod.GET, "/api/asset-category/all").authenticated()
                                .requestMatchers(HttpMethod.PUT, "/api/asset-category/update/{id}").hasAuthority(ADMIN)
                                .requestMatchers(HttpMethod.DELETE, "/api/asset-category/delete/{id}").hasAuthority(ADMIN)
                                .requestMatchers(HttpMethod.GET, "/api/asset-category/all/v2").hasAnyAuthority(ADMIN,EMPLOYEE)
                                .requestMatchers(HttpMethod.GET, "/api/asset-category/get-one/{id}").hasAnyAuthority(ADMIN,EMPLOYEE)


//                                ASSET API
                                .requestMatchers(HttpMethod.GET, "/api/asset/all/v2").hasAnyAuthority(ADMIN,EMPLOYEE)
                                .requestMatchers(HttpMethod.POST, "/api/asset/add/{asset_category_id}").hasAuthority(ADMIN)
                                .requestMatchers(HttpMethod.PUT, "/api/asset/update/{id}").hasAuthority(ADMIN)
                                .requestMatchers(HttpMethod.DELETE, "/api/asset/delete/{id}").hasAuthority(ADMIN)
                                .requestMatchers(HttpMethod.GET, "/api/asset/type").hasAnyAuthority(ADMIN,EMPLOYEE)
                                .requestMatchers(HttpMethod.GET, "/api/asset/by-asset-category/{asset_category_id}").hasAnyAuthority(ADMIN,EMPLOYEE)
                                .requestMatchers(HttpMethod.GET, "/api/asset/get-one/{id}").hasAnyAuthority(ADMIN,EMPLOYEE)
                                .requestMatchers(HttpMethod.PUT, "/api/asset/upload/{asset_id}").hasAuthority(ADMIN)
                        

//                               ASSET REQUEST API
                                .requestMatchers(HttpMethod.GET, "/api/asset-request/all").hasAuthority(ADMIN)
                                .requestMatchers(HttpMethod.GET, "/api/asset-request/all-emp").hasAuthority(EMPLOYEE)
                                .requestMatchers(HttpMethod.GET, "/api/asset-request/pending").hasAuthority(EMPLOYEE)
                                .requestMatchers(HttpMethod.GET, "/api/asset-request/pending-admin").hasAuthority(ADMIN)
                                .requestMatchers(HttpMethod.DELETE, "/api/asset-request/delete/{asset_request_id}").hasAuthority(EMPLOYEE)
                                .requestMatchers(HttpMethod.POST, "/api/asset-request/add/{asset_id}").hasAuthority(EMPLOYEE)
                                .requestMatchers(HttpMethod.PUT,"/api/asset-request/update-reject/{asset_request_id}").hasAuthority(ADMIN)


//                               ASSET ALLOCATION API
                                .requestMatchers(HttpMethod.GET, "/api/asset-allocation/all").hasAuthority(ADMIN)
                                .requestMatchers(HttpMethod.POST, "/api/asset-allocation/add/{request_id}").hasAuthority(ADMIN)
                                .requestMatchers(HttpMethod.PUT,"/api/asset-allocation/{asset_allocation_id}").hasAuthority(EMPLOYEE)
                                .requestMatchers(HttpMethod.GET,"/api/asset-allocation/by-employee/{employee_id}").hasAuthority(ADMIN)
                                .requestMatchers(HttpMethod.GET, "/api/asset-allocation/get-one/{id}").hasAnyAuthority(ADMIN,EMPLOYEE)
                                .requestMatchers(HttpMethod.GET,"/api/asset-allocation/by-employee-login").hasAuthority(EMPLOYEE)

//                              ASSET SERVICE API
                                .requestMatchers(HttpMethod.GET, "/api/asset-service/all").hasAuthority(ADMIN)
                                .requestMatchers(HttpMethod.POST, "/api/asset-service/add/{asset_id}").hasAuthority(EMPLOYEE)
                                .requestMatchers(HttpMethod.PUT,"/api/asset-service/{asset_service_id}").hasAuthority(ADMIN)
                                .requestMatchers(HttpMethod.GET,"/api/asset-service/get-one/{id}").hasAuthority(ADMIN)
                                .requestMatchers(HttpMethod.GET,"/api/asset-service/get-for-employee").hasAuthority(EMPLOYEE)
                                .requestMatchers(HttpMethod.GET,"/api/asset-service/delete/{asset_service_id}").hasAuthority(EMPLOYEE)

//                                EMPLOYEE API
                                .requestMatchers(HttpMethod.GET, "/api/employee/all").hasAuthority(ADMIN)
                                .requestMatchers(HttpMethod.GET, "/api/employee/with-asset").hasAuthority(ADMIN)
                                .requestMatchers(HttpMethod.GET,"/api/employee/get-one/{id}").hasAuthority(ADMIN)
                                .requestMatchers(HttpMethod.GET,"/api/employee/get").hasAuthority(EMPLOYEE)

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
