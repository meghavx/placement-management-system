package com.application.placementmanagementsystem.config;

import com.application.placementmanagementsystem.models.User;
import com.application.placementmanagementsystem.models.enums.RoleType;
import com.application.placementmanagementsystem.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SuperAdminInitializer implements CommandLineRunner {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private static final Logger log = LoggerFactory.getLogger(SuperAdminInitializer.class);

    @Value("${app.super-admin.name}")
    private String superAdminName;

    @Value("${app.super-admin.email}")
    private String superAdminEmail;

    @Value("${app.super-admin.password}")
    private String superAdminPassword;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.existsByRole(RoleType.SUPER_ADMIN)) {
            log.info("Super Admin account already exists.");
            return;
        }
        User superAdmin = User.builder()
                .fullName(superAdminName)
                .email(superAdminEmail)
                .password(passwordEncoder.encode(superAdminPassword))
                .role(RoleType.SUPER_ADMIN)
                .active(true)
                .build();

        userRepository.save(superAdmin);
        log.info("Super Admin account created successfully.");
    }
}