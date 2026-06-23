    package com.app.model;

    import com.app.enums.Role;
    import jakarta.persistence.*;
    import lombok.Getter;
    import lombok.Setter;
    import org.hibernate.annotations.CreationTimestamp;
    import org.hibernate.annotations.UpdateTimestamp;
    import org.springframework.security.core.GrantedAuthority;
    import org.springframework.security.core.authority.SimpleGrantedAuthority;
    import org.springframework.security.core.userdetails.UserDetails;

    import java.time.Instant;
    import java.util.Collection;
    import java.util.List;

    @Entity
    @Getter
    @Setter
    @Table(name = "user_info")
    public class User implements UserDetails {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private int id;

        @Column(nullable = false,unique = true)
        private String username;

        @Column(length = 1000)
        private String password;
        @Enumerated(EnumType.STRING)
        private Role role;

        private boolean isFirstTime;


        @CreationTimestamp
        @Column(updatable = false)
        private Instant createdAt;

        @UpdateTimestamp
        private Instant updatedAt;


        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
            SimpleGrantedAuthority sga = new SimpleGrantedAuthority(role.toString());
            return List.of(sga);
        }
    }
