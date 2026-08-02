package com.application.placementmanagementsystem.services.report;

import com.application.placementmanagementsystem.dtos.report.PlacementReportResponse;
import com.application.placementmanagementsystem.dtos.report.PlacementReportRowResponse;
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;

@Service
@RequiredArgsConstructor
public class ExcelExportServiceImpl
        implements ExcelExportService {

    @Override
    public byte[] exportPlacementReport(
            PlacementReportResponse report
    ) {

        try {

            XSSFWorkbook workbook =
                    new XSSFWorkbook();

            XSSFSheet sheet =
                    workbook.createSheet(
                            "Placement Report"
                    );

            int rowNumber = 0;

            Row summary = sheet.createRow(rowNumber++);
            summary.createCell(0)
                    .setCellValue("Total Students");
            summary.createCell(1)
                    .setCellValue(report.getTotalStudents());

            summary = sheet.createRow(rowNumber++);
            summary.createCell(0)
                    .setCellValue("Placed Students");
            summary.createCell(1)
                    .setCellValue(
                            report.getTotalPlacedStudents()
                    );

            summary = sheet.createRow(rowNumber++);
            summary.createCell(0)
                    .setCellValue(
                            "Placement Percentage"
                    );
            summary.createCell(1)
                    .setCellValue(
                            report.getPlacementPercentage()
                    );

            summary = sheet.createRow(rowNumber++);
            summary.createCell(0)
                    .setCellValue("Highest Package");
            summary.createCell(1)
                    .setCellValue(
                            report.getHighestPackage()
                                    .doubleValue()
                    );

            summary = sheet.createRow(rowNumber++);
            summary.createCell(0)
                    .setCellValue("Average Package");
            summary.createCell(1)
                    .setCellValue(
                            report.getAveragePackage()
                                    .doubleValue()
                    );

            rowNumber++;

            Row header =
                    sheet.createRow(rowNumber++);

            header.createCell(0)
                    .setCellValue("Student");

            header.createCell(1)
                    .setCellValue("Roll No");

            header.createCell(2)
                    .setCellValue("Department");

            header.createCell(3)
                    .setCellValue("Company");

            header.createCell(4)
                    .setCellValue("Role");

            header.createCell(5)
                    .setCellValue("Package");

            header.createCell(6)
                    .setCellValue("Status");

            header.createCell(7)
                    .setCellValue("Drive Date");

            for (PlacementReportRowResponse row :
                    report.getPlacements()) {

                Row data =
                        sheet.createRow(rowNumber++);

                data.createCell(0)
                        .setCellValue(
                                row.getStudentName()
                        );

                data.createCell(1)
                        .setCellValue(
                                row.getRollNumber()
                        );

                data.createCell(2)
                        .setCellValue(
                                row.getDepartment().name()
                        );

                data.createCell(3)
                        .setCellValue(
                                row.getCompanyName()
                        );

                data.createCell(4)
                        .setCellValue(
                                row.getJobRole()
                        );

                data.createCell(5)
                        .setCellValue(
                                row.getPackageOffered()
                                        .doubleValue()
                        );

                data.createCell(6)
                        .setCellValue(
                                row.getApplicationStatus()
                                        .name()
                        );

                data.createCell(7)
                        .setCellValue(
                                row.getDriveDate()
                                        .toString()
                        );

            }

            for (int i = 0; i < 8; i++) {
                sheet.autoSizeColumn(i);
            }

            ByteArrayOutputStream outputStream =
                    new ByteArrayOutputStream();

            workbook.write(outputStream);

            workbook.close();

            return outputStream.toByteArray();

        }

        catch (Exception ex) {

            throw new IllegalStateException(
                    "Unable to generate PDF report."
            );

        }

    }

}