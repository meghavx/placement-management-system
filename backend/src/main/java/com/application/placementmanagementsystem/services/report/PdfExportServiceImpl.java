package com.application.placementmanagementsystem.services.report;

import com.application.placementmanagementsystem.dtos.report.PlacementReportResponse;
import com.application.placementmanagementsystem.dtos.report.PlacementReportRowResponse;
import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;

@Service
@RequiredArgsConstructor
public class PdfExportServiceImpl implements PdfExportService {

    @Override
    public byte[] exportPlacementReport(
            PlacementReportResponse report
    ) {

        try {

            ByteArrayOutputStream outputStream =
                    new ByteArrayOutputStream();

            Document document =
                    new Document(PageSize.A4.rotate());

            PdfWriter.getInstance(
                    document,
                    outputStream
            );

            document.open();

            Font heading =
                    FontFactory.getFont(
                            FontFactory.HELVETICA_BOLD,
                            18
                    );

            document.add(
                    new Paragraph(
                            "Placement Report",
                            heading
                    )
            );

            document.add(new Paragraph(" "));

            document.add(
                    new Paragraph(
                            "Total Students : "
                                    + report.getTotalStudents()
                    )
            );

            document.add(
                    new Paragraph(
                            "Placed Students : "
                                    + report.getTotalPlacedStudents()
                    )
            );

            document.add(
                    new Paragraph(
                            "Placement Percentage : "
                                    + report.getPlacementPercentage()
                                    + "%"
                    )
            );

            document.add(
                    new Paragraph(
                            "Highest Package : "
                                    + report.getHighestPackage()
                    )
            );

            document.add(
                    new Paragraph(
                            "Average Package : "
                                    + report.getAveragePackage()
                    )
            );

            document.add(new Paragraph(" "));

            PdfPTable table =
                    new PdfPTable(8);

            table.setWidthPercentage(100);

            addHeader(table, "Student");
            addHeader(table, "Roll No");
            addHeader(table, "Department");
            addHeader(table, "Company");
            addHeader(table, "Role");
            addHeader(table, "Package");
            addHeader(table, "Status");
            addHeader(table, "Drive Date");

            for (PlacementReportRowResponse row :
                    report.getPlacements()) {

                table.addCell(row.getStudentName());
                table.addCell(row.getRollNumber());
                table.addCell(row.getDepartment().name());
                table.addCell(row.getCompanyName());
                table.addCell(row.getJobRole());
                table.addCell(
                        row.getPackageOffered().toString()
                );
                table.addCell(
                        row.getApplicationStatus().name()
                );
                table.addCell(
                        row.getDriveDate().toString()
                );
            }

            document.add(table);

            document.close();

            return outputStream.toByteArray();

        }

        catch (Exception ex) {

            throw new IllegalStateException(
                    "Unable to generate PDF report."
            );

        }

    }

    private void addHeader(
            PdfPTable table,
            String title
    ) {

        PdfPCell cell =
                new PdfPCell(
                        new Phrase(title)
                );

        table.addCell(cell);

    }

}