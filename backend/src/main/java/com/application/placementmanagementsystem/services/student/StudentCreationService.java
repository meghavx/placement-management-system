package com.application.placementmanagementsystem.services.student;

import com.application.placementmanagementsystem.dtos.student.StudentCreateRequest;
import com.application.placementmanagementsystem.dtos.student.StudentResponse;
import com.application.placementmanagementsystem.exceptions.DuplicateResourceException;
import com.application.placementmanagementsystem.mappers.StudentMapper;
import com.application.placementmanagementsystem.models.Student;
import com.application.placementmanagementsystem.models.User;
import com.application.placementmanagementsystem.models.enums.RoleType;
import com.application.placementmanagementsystem.repositories.StudentRepository;
import com.application.placementmanagementsystem.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class StudentCreationService {

    private final StudentRepository studentRepository;
    private final UserRepository userRepository;
    private final StudentMapper studentMapper;
    private final PasswordEncoder passwordEncoder;

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public StudentResponse createStudent(StudentCreateRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException(
                    "Student with email '" + request.getEmail() + "' already exists"
            );
        }

        if (studentRepository.existsByRollNumber(request.getRollNumber())) {
            throw new DuplicateResourceException(
                    "Student with roll number '" + request.getRollNumber() + "' already exists"
            );
        }

        String temporaryPassword = "Student@123";
        User user = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .phoneNumber(request.getPhoneNumber())
                .password(passwordEncoder.encode(temporaryPassword))
                .role(RoleType.STUDENT)
                .active(true)
                .build();

        User savedUser = userRepository.save(user);
        Student student = Student.builder()
                .user(savedUser)
                .rollNumber(request.getRollNumber())
                .department(request.getDepartment())
                .graduationYear(request.getGraduationYear())
                .cgpa(request.getCgpa())
                .currentBacklogs(request.getCurrentBacklogs())
                .build();
        Student savedStudent = studentRepository.save(student);
        return studentMapper.toResponse(savedStudent);
    }
}