package com.example.demo.service;

import com.example.demo.model.*;
import com.example.demo.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class FileTransferService {

    private static final Logger log = LoggerFactory.getLogger(FileTransferService.class);

    @Autowired
    private PathConfigRepository pathConfigRepository;

    @Autowired
    private ReportRepository reportRepository;

    @Autowired
    private TransferLogRepository transferLogRepository;

    @Value("${file.transfer.source.base}")
    private String sourceBase;

    @Value("${file.transfer.destination.base}")
    private String destinationBase;

    @Transactional
    public void syncFile(Integer pathConfigId, Integer userId) throws IOException {
        log.info("Starting sync for pathConfigId: {}", pathConfigId);

        // 1. Get path config
        PathConfig pathConfig = pathConfigRepository.findById(pathConfigId)
                .orElseThrow(() -> new RuntimeException("PathConfig not found: " + pathConfigId));

        // 2. Get corresponding report
        Report report = reportRepository.findByPathConfigId(pathConfigId)
                .orElseThrow(() -> new RuntimeException("Report not found for pathConfigId: " + pathConfigId));

        try {
            // 3. Build source path (flat folder)
            String sourcePathStr = sourceBase + "/" + pathConfig.getInputFileName();
            Path sourcePath = Paths.get(sourcePathStr);

            log.info("Source path: {}", sourcePathStr);

            // 4. Check if source file exists
            if (!Files.exists(sourcePath)) {
                throw new IOException("Source file not found: " + sourcePathStr);
            }

            // 5. Build destination path (dynamic based on output_folder_path)
            String destinationPathStr = destinationBase + "/" +
                    pathConfig.getOutputFolderPath() + "/" +
                    pathConfig.getInputFileName();
            Path destinationPath = Paths.get(destinationPathStr);

            log.info("Destination path: {}", destinationPathStr);

            // 6. Create destination directories if needed
            Files.createDirectories(destinationPath.getParent());

            // 7. Copy file
            Files.copy(sourcePath, destinationPath, StandardCopyOption.REPLACE_EXISTING);
            log.info("File copied successfully");

            // 8. Update report status to 'synced'
            report.setStatus("synced");
            report.setFilePath(destinationPathStr);
            report.setUpdatedAt(LocalDateTime.now());
            reportRepository.save(report);

            log.info("Report status updated to synced");

            // 9. Create transfer log (audit trail)
            TransferLog transferLog = new TransferLog();
            transferLog.setPathConfig(pathConfig);
            transferLog.setUserId(userId);
            transferLog.setStatus("synced");
            transferLog.setFolder(pathConfig.getOutputFolderPath());
            transferLog.setTransferredAt(LocalDateTime.now());
            transferLogRepository.save(transferLog);

            log.info("Transfer log created");

        } catch (Exception e) {
            log.error("Error syncing file: {}", e.getMessage(), e);

            // Update report to failed
            report.setStatus("failed");
            report.setUpdatedAt(LocalDateTime.now());
            reportRepository.save(report);

            // Create failed transfer log
            TransferLog failLog = new TransferLog();
            failLog.setPathConfig(pathConfig);
            failLog.setUserId(userId);
            failLog.setStatus("failed");
            failLog.setFolder(pathConfig.getOutputFolderPath());
            failLog.setErrorMessage(e.getMessage());
            failLog.setTransferredAt(LocalDateTime.now());
            transferLogRepository.save(failLog);

            throw new IOException("Failed to sync file: " + e.getMessage(), e);
        }
    }

    @Transactional
    public void syncAllFiles(Integer userId) {
        log.info("Starting sync all files");

        // Get all pending reports
        List<Report> pendingReports = reportRepository.findByStatus("pending");

        log.info("Found {} pending files to sync", pendingReports.size());

        int successCount = 0;
        int failCount = 0;

        for (Report report : pendingReports) {
            try {
                if (report.getPathConfig() != null) {
                    syncFile(report.getPathConfig().getId(), userId);
                    successCount++;
                }
            } catch (Exception e) {
                log.error("Failed to sync file {}: {}", report.getName(), e.getMessage());
                failCount++;
            }
        }

        log.info("Sync all completed. Success: {}, Failed: {}", successCount, failCount);
    }
}
