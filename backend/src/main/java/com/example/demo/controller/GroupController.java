package com.example.demo.controller;

import com.example.demo.model.Report;
import com.example.demo.service.ReportService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/groups")
@CrossOrigin(origins = "*")
public class GroupController {

    private final ReportService reportService;

    public GroupController(ReportService reportService) {
        this.reportService = reportService;
    }

    /**
     * GET /api/groups/{groupId}/reports
     * Returns all reports for the given group id.
     */
    @GetMapping("/{groupId}/reports")
    public List<Report> getReportsForGroup(@PathVariable Integer groupId) {
        return reportService.getReportsByGroupId(groupId);
    }
}
