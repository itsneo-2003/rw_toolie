package com.example.demo.service;

import com.example.demo.dto.ReportDTO;
import com.example.demo.model.Group;
import com.example.demo.model.Report;
import com.example.demo.model.User;
import com.example.demo.repository.GroupRepository;
import com.example.demo.repository.ReportRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ReportService {

    private final ReportRepository reportRepository;
    private final GroupRepository groupRepository;
    private final UserRepository userRepository;

    public ReportService(ReportRepository reportRepository, GroupRepository groupRepository, UserRepository userRepository) {
        this.reportRepository = reportRepository;
        this.groupRepository = groupRepository;
        this.userRepository = userRepository;
    }

    /**
     * Returns all reports for a given group id.
     * Throws RuntimeException if group not found.
     */
    public List<Report> getReportsByGroupId(Integer groupId) {
        Optional<Group> groupOpt = groupRepository.findById(groupId);
        if (groupOpt.isEmpty()) {
            throw new RuntimeException("Group not found with id: " + groupId);
        }
        // use repository method to fetch reports by group id
        return reportRepository.findByGroup_Id(groupId);
    }

    /**
     * Optional helper: get reports by group entity
     */
    public List<Report> getReportsByGroup(Group group) {
        return reportRepository.findByGroup_Id(group.getId());
    }

    /**
     * Returns the 10 most recent reports from all groups a user is subscribed to.
     * Throws RuntimeException if user not found.
     */
    public List<ReportDTO> getRecentReportsByUserEmail(String email) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            throw new RuntimeException("User not found with email: " + email);
        }
        User user = userOpt.get();
        List<ReportDTO> allReports = reportRepository.findTop10RecentReportsByUserId(user.getId());

        // Limit to 10 most recent reports
        return allReports.stream()
                .limit(10)
                .collect(Collectors.toList());
    }
}
