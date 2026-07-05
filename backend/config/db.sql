CREATE DATABASE IF NOT EXISTS clinikx;
USE clinikx;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  phone_number VARCHAR(10) NOT NULL UNIQUE,
  role ENUM('super_admin','clinic_admin','doctor','receptionist') DEFAULT 'clinic_admin',
  otp VARCHAR(6),
  otp_expiry DATETIME,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (phone_number, role) VALUES
('9999999999', 'super_admin'),
('8888888888', 'clinic_admin'),
('7777777777', 'doctor'),
('6666666666', 'receptionist');