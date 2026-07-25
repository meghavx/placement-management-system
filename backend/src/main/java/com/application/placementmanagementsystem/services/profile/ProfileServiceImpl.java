package com.application.placementmanagementsystem.services.profile;

import com.application.placementmanagementsystem.auth.CustomUserPrincipal;
import com.application.placementmanagementsystem.dtos.placementAdmin.PlacementAdminResponse;
import com.application.placementmanagementsystem.dtos.profile.PlacementAdminProfileUpdateRequest;
import com.application.placementmanagementsystem.dtos.profile.RecruiterProfileUpdateRequest;
import com.application.placementmanagementsystem.dtos.profile.StudentProfileUpdateRequest;
import com.application.placementmanagementsystem.dtos.recruiter.RecruiterResponse;
import com.application.placementmanagementsystem.dtos.student.StudentResponse;
import com.application.placementmanagementsystem.exceptions.ResourceNotFoundException;
import com.application.placementmanagementsystem.mappers.PlacementAdminMapper;
import com.application.placementmanagementsystem.mappers.RecruiterMapper;
import com.application.placementmanagementsystem.mappers.StudentMapper;
import com.application.placementmanagementsystem.models.Recruiter;
import com.application.placementmanagementsystem.models.Student;
import com.application.placementmanagementsystem.models.User;
import com.application.placementmanagementsystem.repositories.RecruiterRepository;
import com.application.placementmanagementsystem.repositories.StudentRepository;
import com.application.placementmanagementsystem.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class ProfileServiceImpl implements ProfileService {

    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    private final RecruiterRepository recruiterRepository;

    private final StudentMapper studentMapper;
    private final RecruiterMapper recruiterMapper;
    private final PlacementAdminMapper placementAdminMapper;

    @Override
    @Transactional(readOnly = true)
    public StudentResponse getStudentProfile() {
        Student student = getCurrentStudent();
        return studentMapper.toResponse(student);
    }

    @Override
    public StudentResponse updateStudentProfile(StudentProfileUpdateRequest request) {
        Student student = getCurrentStudent();
        User user = student.getUser();
        user.setFullName(request.getFullName());
        user.setPhoneNumber(request.getPhoneNumber());
        userRepository.save(user);
        return studentMapper.toResponse(student);
    }

    @Override
    @Transactional(readOnly = true)
    public RecruiterResponse getRecruiterProfile() {
        Recruiter recruiter = getCurrentRecruiter();
        return recruiterMapper.toResponse(recruiter);
    }

    @Override
    public RecruiterResponse updateRecruiterProfile(RecruiterProfileUpdateRequest request) {
        Recruiter recruiter = getCurrentRecruiter();
        User user = recruiter.getUser();
        user.setFullName(request.getFullName());
        user.setPhoneNumber(request.getPhoneNumber());
        userRepository.save(user);
        return recruiterMapper.toResponse(recruiter);
    }

    @Override
    @Transactional(readOnly = true)
    public PlacementAdminResponse getPlacementAdminProfile() {
        User user = getCurrentUser();
        return placementAdminMapper.toResponse(user);
    }

    @Override
    public PlacementAdminResponse updatePlacementAdminProfile(
            PlacementAdminProfileUpdateRequest request
    ) {
        User user = getCurrentUser();
        user.setFullName(request.getFullName());
        user.setPhoneNumber(request.getPhoneNumber());
        userRepository.save(user);
        return placementAdminMapper.toResponse(user);
    }

    // Private Helper Methods
    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder
                .getContext()
                .getAuthentication();

        CustomUserPrincipal principal =
                (CustomUserPrincipal) authentication.getPrincipal();

        return userRepository.findById(principal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    private Student getCurrentStudent() {
        return studentRepository.findByUser(getCurrentUser())
                .orElseThrow(() -> new ResourceNotFoundException("Student not found"));
    }

    private Recruiter getCurrentRecruiter() {
        return recruiterRepository.findByUser(getCurrentUser())
                .orElseThrow(() -> new ResourceNotFoundException("Recruiter not found"));
    }
}