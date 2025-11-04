INSERT INTO path_configs (unique_id, action, input_file_name, file_type, output_folder_path, created_at, updated_at) 
VALUES 
('REQ-001-ABC', 'New', 'Customer_2023052701010_1.csv', 'csv', 'SG/Retail/Customer', NOW(), NOW()),
('REQ-002-DEF', 'New', 'Invoice_2024011234567_2.pdf', 'pdf', 'SG/Finance/Invoice', NOW(), NOW()),
('REQ-003-GHI', 'New', 'Report_XYZ_3.csv', 'csv', 'UK/Operations/Reports', NOW(), NOW()),
('REQ-004-JKL', 'New', 'Document_ABC_4.txt', 'txt', 'US/Documents/Archive', NOW(), NOW()),
('REQ-005-MNO', 'New', 'File_DEF_5.pdf', 'pdf', 'SG/Files/Public', NOW(), NOW());

-- Insert corresponding reports (status='pending')
INSERT INTO reports (name, status, path_config_id, created_at, updated_at)
VALUES 
('Customer_2023052701010_1.csv', 'pending', 1, NOW(), NOW()),
('Invoice_2024011234567_2.pdf', 'pending', 2, NOW(), NOW()),
('Report_XYZ_3.csv', 'pending', 3, NOW(), NOW()),
('Document_ABC_4.txt', 'pending', 4, NOW(), NOW()),
('File_DEF_5.pdf', 'pending', 5, NOW(), NOW());
