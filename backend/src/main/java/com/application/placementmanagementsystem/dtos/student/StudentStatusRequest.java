package com.application.placementmanagementsystem.dtos.student;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StudentStatusRequest {

    @NotNull
    private Boolean active;
}
