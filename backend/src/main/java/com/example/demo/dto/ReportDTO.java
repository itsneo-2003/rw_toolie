package com.example.demo.dto;

import java.time.LocalDate;

public class ReportDTO {
    private Integer id;
    private String name;
    private LocalDate date;
    private String status;
    private String filePath;
    private String groupName;
    private Integer groupId;

    // Constructor for JPQL query
    public ReportDTO(Integer id, String name, LocalDate date, String status,
                     String filePath, String groupName, Integer groupId) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.status = status;
        this.filePath = filePath;
        this.groupName = groupName;
        this.groupId = groupId;
    }

    // Getters and Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public String getGroupName() {
        return groupName;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }

    public Integer getGroupId() {
        return groupId;
    }

    public void setGroupId(Integer groupId) {
        this.groupId = groupId;
    }
}
