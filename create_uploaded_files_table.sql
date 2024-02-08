CREATE TABLE uploaded_files (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  file_path VARCHAR(255) NOT NULL,
  file_type VARCHAR(255) NOT NULL
);
