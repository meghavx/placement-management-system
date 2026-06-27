package com.application.placementmanagementsystem.config;

import io.swagger.v3.oas.annotations.ExternalDocumentation;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "Placement Management System API",
                version = "v1.0",
                description = "REST APIs for the Placement Management System",
                contact = @Contact(
                        name = "Placement Management System Backend"
                )
        ),
        externalDocs = @ExternalDocumentation(
                description = "Source Code",
                url = "https://github.com/meghavx/placement-management-system/tree/main/backend"
        ),
        security = {
                @SecurityRequirement(name = "bearerAuth")
        }
)

@SecurityScheme(
        name = "bearerAuth",
        type = SecuritySchemeType.HTTP,
        scheme = "bearer",
        bearerFormat = "JWT"
)
public class OpenApiConfig {}


