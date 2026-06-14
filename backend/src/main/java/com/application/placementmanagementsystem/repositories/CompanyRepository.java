package com.application.placementmanagementsystem.repositories;

import com.application.placementmanagementsystem.models.Company;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyRepository extends JpaRepository<Company, Long> {
}
