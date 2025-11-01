package com.example.demo.repository;

import com.example.demo.dto.ReportDTO;
import com.example.demo.model.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ReportRepository extends JpaRepository<Report, Integer> {
    // Spring Data JPA derived query: find reports by the group's id
    List<Report> findByGroup_Id(Integer groupId);

    // Custom query to fetch 10 most recent reports from all subscribed groups
    @Query("SELECT new com.example.demo.dto.ReportDTO(r.id, r.name, r.date, r.status, r.filePath, g.name, g.id) " +
           "FROM Report r " +
           "JOIN r.group g " +
           "JOIN Subscription s ON s.group.id = g.id " +
           "WHERE s.user.id = :userId " +
           "ORDER BY r.date DESC, r.createdAt DESC")
    List<ReportDTO> findTop10RecentReportsByUserId(@Param("userId") Integer userId);
}
