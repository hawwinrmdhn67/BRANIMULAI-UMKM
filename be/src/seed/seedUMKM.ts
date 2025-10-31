import { db } from "../config/db";
import { umkmList } from "../data/umkmData";

async function seed() {
  try {
    // If this DB was created previously with latitude/longitude columns,
    // drop those columns (migration to link-only model). Then ensure
    // `location_link` exists. Use IF EXISTS/IF NOT EXISTS where supported.
    // Note: DROP COLUMN IF EXISTS requires MySQL 8+. We catch errors for older versions.
    await db.query(`ALTER TABLE umkm DROP COLUMN IF EXISTS latitude`).catch(() => {});
    await db.query(`ALTER TABLE umkm DROP COLUMN IF EXISTS longitude`).catch(() => {});

    // Ensure location_link exists (add if missing). If DB doesn't support IF NOT EXISTS,
    // this will be ignored by the catch and CREATE TABLE below will create the column.
    await db.query(`ALTER TABLE umkm ADD COLUMN IF NOT EXISTS location_link VARCHAR(512)`).catch(() => {});

    // Create table if not exists (schema now uses location_link instead of latitude/longitude)
    await db.query(`
      CREATE TABLE IF NOT EXISTS umkm (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(255) NOT NULL,
        description TEXT,
        address VARCHAR(255),
        location_link VARCHAR(512),
        photos JSON,
        phone VARCHAR(20),
        whatsapp VARCHAR(20),
        createdAt TIMESTAMP,
        status VARCHAR(50)
      )
    `);

    console.log("✅ Tabel 'umkm' telah siap.");

    for (const item of umkmList) {
      const createdAt = item.createdAt
        ? item.createdAt instanceof Date
          ? item.createdAt.toISOString().slice(0, 19).replace("T", " ")
          : item.createdAt
        : new Date().toISOString().slice(0, 19).replace("T", " "); 
      // build a location link if the data contains coordinates
      let locationLink = null;
      if (item.locationLink) {
        locationLink = item.locationLink;
      } else if (item.coordinates && item.coordinates.lat != null && item.coordinates.lng != null) {
        locationLink = `https://www.google.com/maps?q=${item.coordinates.lat},${item.coordinates.lng}`;
      }

      await db.query(
        `INSERT INTO umkm (name, category, description, address, location_link, photos, phone, whatsapp, createdAt, status)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          item.name,
          item.category,
          item.description,
          item.address,
          locationLink,
          JSON.stringify(item.photos),
          item.phone || null,
          item.whatsapp || null,
          createdAt,
          item.status,
        ]
      );
    }

    console.log("✅ Data UMKM berhasil dimasukkan ke database.");
    process.exit(0);
  } catch (err) {
    console.error("❌ Gagal seed data:", err);
    process.exit(1);
  }
}

seed();
