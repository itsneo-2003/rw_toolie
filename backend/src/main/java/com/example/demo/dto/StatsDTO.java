package com.example.demo.dto;

public class StatsDTO {
    private long total;
    private long pending;
    private long synced;
    private long failed;

    public StatsDTO() {
    }

    public StatsDTO(long total, long pending, long synced, long failed) {
        this.total = total;
        this.pending = pending;
        this.synced = synced;
        this.failed = failed;
    }

    // Getters and Setters
    public long getTotal() {
        return total;
    }

    public void setTotal(long total) {
        this.total = total;
    }

    public long getPending() {
        return pending;
    }

    public void setPending(long pending) {
        this.pending = pending;
    }

    public long getSynced() {
        return synced;
    }

    public void setSynced(long synced) {
        this.synced = synced;
    }

    public long getFailed() {
        return failed;
    }

    public void setFailed(long failed) {
        this.failed = failed;
    }
}
