package com.example.demo.repository;

import com.example.demo.dto.ReportDTO;
import com.example.demo.model.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ReportRepository extends JpaRepository<Report, Integer> {

    // Methods from demo 1
    List<Report> findByGroup_Id(Integer groupId);

    @Query("SELECT new com.example.demo.dto.ReportDTO(r.id, r.name, r.date, r.status, r.filePath, g.name, g.id) " +
           "FROM Report r " +
           "JOIN r.group g " +
           "JOIN Subscription s ON s.group.id = g.id " +
           "WHERE s.user.id = :userId " +
           "ORDER BY r.date DESC, r.createdAt DESC")
    List<ReportDTO> findTop10RecentReportsByUserId(@Param("userId") Integer userId);

    // Methods from demo 2
    List<Report> findByStatus(String status);

    long countByStatus(String status);

    Optional<Report> findByPathConfigId(Integer pathConfigId);

    List<Report> findByStatusAndCreatedAtAfter(String status, LocalDateTime timestamp);
}
