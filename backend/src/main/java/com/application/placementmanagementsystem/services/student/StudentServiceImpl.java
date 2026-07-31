package com.application.placementmanagementsystem.services.student;

import com.application.placementmanagementsystem.dtos.student.*;
import com.application.placementmanagementsystem.exceptions.ResourceNotFoundException;
import com.application.placementmanagementsystem.mappers.StudentMapper;
import com.application.placementmanagementsystem.models.Student;
import com.application.placementmanagementsystem.models.User;
import com.application.placementmanagementsystem.models.enums.Department;
import com.application.placementmanagementsystem.repositories.StudentRepository;
import com.application.placementmanagementsystem.repositories.UserRepository;
import com.application.placementmanagementsystem.models.enums.AuditAction;
import com.application.placementmanagementsystem.models.enums.AuditEntityType;
import com.application.placementmanagementsystem.services.audit.AuditLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validator;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;
    private final UserRepository userRepository;
    private final StudentMapper studentMapper;
    private final AuditLogService auditLogService;

    private final StudentCreationService studentCreationService;
    private final Validator validator;

    @Override
    public StudentResponse createStudent(StudentCreateRequest request) {
        return studentCreationService.createStudent(request);
    }

    @Override
    public StudentImportResponse importStudents(MultipartFile file) {

        List<StudentImportError> errors = new ArrayList<>();

        int total = 0;
        int created = 0;

        try (Workbook workbook = new XSSFWorkbook(file.getInputStream())) {
            Sheet sheet = workbook.getSheetAt(0);
            for (int i = 1; i <= sheet.getLastRowNum(); i++) {
                Row row = sheet.getRow(i);
                if (row == null || isRowEmpty(row)) {
                    continue;
                }
                total++;
                try {
                    StudentCreateRequest request = mapRowToStudentRequest(row);
                    validateStudentRequest(request);
                    studentCreationService.createStudent(request);
                    created++;
                } catch (Exception ex) {
                    String message = ex.getMessage() != null
                            ? ex.getMessage()
                            : "Invalid student data";
                    errors.add(
                            new StudentImportError(
                                    i + 1,
                                    message
                            )
                    );
                }
            }

        } catch (IOException ex) {
            throw new IllegalArgumentException("Unable to read Excel file", ex);
        }
        return new StudentImportResponse(
                total,
                created,
                errors.size(),
                errors
        );
    }

    @Override
    @Transactional(readOnly = true)
    public StudentResponse getStudentById(Long studentId) {

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Student not found with id: " + studentId
                        ));

        return studentMapper.toResponse(student);
    }

    @Override
    @Transactional(readOnly = true)
    public List<StudentResponse> getAllStudents() {

        return studentRepository.findAll()
                .stream()
                .map(studentMapper::toResponse)
                .toList();
    }

    @Override
    public StudentResponse updateStudent(
            Long studentId,
            StudentUpdateRequest request
    ) {

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Student not found with id: " + studentId
                        ));

        User user = student.getUser();

        user.setFullName(request.getFullName());
        user.setPhoneNumber(request.getPhoneNumber());

        student.setDepartment(request.getDepartment());
        student.setGraduationYear(request.getGraduationYear());
        student.setCgpa(request.getCgpa());
        student.setCurrentBacklogs(request.getCurrentBacklogs());

        userRepository.save(user);
        Student updatedStudent = studentRepository.save(student);
        auditLogService.log(
                AuditAction.UPDATE,
                AuditEntityType.STUDENT,
                updatedStudent.getId(),
                "Updated student: " + updatedStudent.getUser().getFullName()
        );
        return studentMapper.toResponse(updatedStudent);
    }

    @Override
    public StudentResponse updateStudentStatus(
            Long studentId,
            boolean active
    ) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Student not found with id: " + studentId
                        ));

        User user = student.getUser();

        user.setActive(active);

        userRepository.save(user);

        auditLogService.log(
                active ? AuditAction.ACTIVATE : AuditAction.DEACTIVATE,
                AuditEntityType.STUDENT,
                student.getId(),
                (active ? "Activated student: " : "Deactivated student: ")
                        + student.getUser().getFullName()
        );

        return studentMapper.toResponse(student);
    }

    // Private Helper Methods

    private StudentCreateRequest mapRowToStudentRequest(Row row) {

        DataFormatter formatter = new DataFormatter();
        return StudentCreateRequest.builder()
                .fullName(formatter.formatCellValue(row.getCell(0)).trim())
                .email(formatter.formatCellValue(row.getCell(1)).trim())
                .rollNumber(formatter.formatCellValue(row.getCell(2)).trim())
                .phoneNumber(formatter.formatCellValue(row.getCell(3)).trim())
                .department(
                        Department.valueOf(
                                formatter.formatCellValue(row.getCell(4))
                                        .trim()
                                        .toUpperCase()
                        )
                )
                .graduationYear(
                        Integer.valueOf(
                                formatter.formatCellValue(row.getCell(5)).trim()
                        )
                )
                .cgpa(
                        new BigDecimal(
                                formatter.formatCellValue(row.getCell(6)).trim()
                        )
                )
                .currentBacklogs(
                        Integer.parseInt(
                                formatter.formatCellValue(row.getCell(7)).trim()
                        )
                )
                .build();
    }

    private boolean isRowEmpty(Row row) {
        DataFormatter formatter = new DataFormatter();
        for (int i = 0; i < 8; i++) {
            Cell cell = row.getCell(i);
            if (cell != null &&
                    !formatter.formatCellValue(cell).trim().isEmpty()) {
                return false;
            }
        }
        return true;
    }

    private void validateStudentRequest(StudentCreateRequest request) {
        Set<ConstraintViolation<StudentCreateRequest>> violations = validator.validate(request);
        if (!violations.isEmpty()) {
            String message = violations.stream()
                    .map(ConstraintViolation::getMessage)
                    .distinct()
                    .collect(Collectors.joining(", "));
            throw new IllegalArgumentException(message);
        }
    }
}