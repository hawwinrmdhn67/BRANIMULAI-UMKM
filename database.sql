CREATE DATABASE IF NOT EXISTS branimulai_db;
USE branimulai_db;

CREATE TABLE umkm (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  address VARCHAR(255) NOT NULL,
  latitude DOUBLE NOT NULL,
  longitude DOUBLE NOT NULL,
  maps_link TEXT,  
  photos JSON NOT NULL,
  phone VARCHAR(20),
  whatsapp VARCHAR(20),
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',

  -- Mencegah duplikat kombinasi nama + alamat
  UNIQUE KEY unique_umkm (name, address)
);
