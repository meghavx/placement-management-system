package com.application.placementmanagementsystem.services.placementadmin;

import com.application.placementmanagementsystem.dtos.placementadmin.CreatePlacementAdminRequest;
import com.application.placementmanagementsystem.dtos.placementadmin.PlacementAdminResponse;
import com.application.placementmanagementsystem.dtos.placementadmin.UpdatePlacementAdminRequest;
import com.application.placementmanagementsystem.exceptions.DuplicateResourceException;
import com.application.placementmanagementsystem.exceptions.ResourceAlreadyExistsException;
import com.application.placementmanagementsystem.exceptions.ResourceNotFoundException;
import com.application.placementmanagementsystem.mappers.PlacementAdminMapper;
import com.application.placementmanagementsystem.models.User;
import com.application.placementmanagementsystem.models.enums.RoleType;
import com.application.placementmanagementsystem.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PlacementAdminServiceImpl implements PlacementAdminService {
    private final UserRepository userRepository;
    private final PlacementAdminMapper placementAdminMapper;
    private final PasswordEncoder passwordEncoder;

    private static final String DEFAULT_PASSWORD = "PlacementAdmin@123";

    @Override
    public PlacementAdminResponse createPlacementAdmin(CreatePlacementAdminRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new DuplicateResourceException(
                    "User already exists with email: " + request.email()
            );
        }

        User placementAdmin = placementAdminMapper.toEntity(request);
        placementAdmin.setPassword(passwordEncoder.encode(DEFAULT_PASSWORD));
        User savedPlacementAdmin = userRepository.save(placementAdmin);
        return placementAdminMapper.toResponse(savedPlacementAdmin);
    }

    @Override
    public PlacementAdminResponse updatePlacementAdmin(Long id, UpdatePlacementAdminRequest request) {
        User placementAdmin = userRepository
                .findByIdAndRole(id, RoleType.PLACEMENT_ADMIN)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Placement Admin with id = " + id + " not found"
                ));
        if (userRepository.existsByEmailAndIdNot(request.email(), id)) {
            throw new ResourceAlreadyExistsException(
                    "User already exists with email: " + request.email()
            );
        }
        placementAdminMapper.updateEntity(request, placementAdmin);
        User savedPlacementAdmin = userRepository.save(placementAdmin);
        return placementAdminMapper.toResponse(savedPlacementAdmin);
    }

    @Override
    public PlacementAdminResponse updatePlacementAdminStatus(Long id, boolean active) {
        User placementAdmin = userRepository
                .findByIdAndRole(id, RoleType.PLACEMENT_ADMIN)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Placement Admin with id = " + id + " not found"
                        )
                );
        placementAdmin.setActive(active);
        User updatedPlacementAdmin = userRepository.save(placementAdmin);
        return placementAdminMapper.toResponse(updatedPlacementAdmin);
    }

    @Override
    public PlacementAdminResponse getPlacementAdminById(Long id) {
        User placementAdmin = userRepository
                .findByIdAndRole(id, RoleType.PLACEMENT_ADMIN)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Placement Admin with id = " + id + " not found"
                        )
                );
        return placementAdminMapper.toResponse(placementAdmin);
    }

    @Override
    public List<PlacementAdminResponse> getAllPlacementAdmins() {
        return userRepository.findAllByRole(RoleType.PLACEMENT_ADMIN)
                .stream()
                .map(placementAdminMapper::toResponse)
                .toList();
    }
}
