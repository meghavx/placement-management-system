package com.application.placementmanagementsystem.services.placementAdmin;

import com.application.placementmanagementsystem.dtos.placementAdmin.CreatePlacementAdminRequest;
import com.application.placementmanagementsystem.dtos.placementAdmin.PlacementAdminResponse;
import com.application.placementmanagementsystem.dtos.placementAdmin.UpdatePlacementAdminRequest;
import com.application.placementmanagementsystem.exceptions.ResourceAlreadyExistsException;
import com.application.placementmanagementsystem.exceptions.ResourceNotFoundException;
import com.application.placementmanagementsystem.mappers.PlacementAdminMapper;
import com.application.placementmanagementsystem.models.User;
import com.application.placementmanagementsystem.models.enums.RoleType;
import com.application.placementmanagementsystem.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PlacementAdminServiceImpl implements PlacementAdminService {
    private final UserRepository userRepository;
    private final PlacementAdminMapper placementAdminMapper;

    @Override
    public PlacementAdminResponse createPlacementAdmin(CreatePlacementAdminRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new ResourceAlreadyExistsException(
                    "User already exists with email: " + request.email()
            );
        }
        User placementAdmin = placementAdminMapper.toEntity(request);
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
