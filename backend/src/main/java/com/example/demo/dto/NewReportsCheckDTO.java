package com.example.demo.dto;

import java.time.LocalDateTime;
import java.util.List;

public class NewReportsCheckDTO {
    private boolean hasNew;
    private int count;
    private LocalDateTime latestTimestamp;
    private List<String> reports;

    public NewReportsCheckDTO() {
    }

    public NewReportsCheckDTO(boolean hasNew, int count, LocalDateTime latestTimestamp, List<String> reports) {
        this.hasNew = hasNew;
        this.count = count;
        this.latestTimestamp = latestTimestamp;
        this.reports = reports;
    }

    // Getters and Setters
    public boolean isHasNew() {
        return hasNew;
    }

    public void setHasNew(boolean hasNew) {
        this.hasNew = hasNew;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public LocalDateTime getLatestTimestamp() {
        return latestTimestamp;
    }

    public void setLatestTimestamp(LocalDateTime latestTimestamp) {
        this.latestTimestamp = latestTimestamp;
    }

    public List<String> getReports() {
        return reports;
    }

    public void setReports(List<String> reports) {
        this.reports = reports;
    }
}
