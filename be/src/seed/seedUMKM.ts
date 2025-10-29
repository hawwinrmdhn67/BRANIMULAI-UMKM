import { db } from "../config/db";
import { umkmList } from "../data/umkmData";

async function seed() {
  for (const item of umkmList) {
    const createdAt = item.createdAt
      ? item.createdAt instanceof Date
        ? item.createdAt.toISOString().slice(0, 19).replace("T", " ")
        : item.createdAt
      : new Date().toISOString().slice(0, 19).replace("T", " "); 

    await db.query(
      `INSERT INTO umkm (name, category, description, address, latitude, longitude, photos, phone, whatsapp, createdAt, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        item.name,
        item.category,
        item.description,
        item.address,
        item.coordinates.lat,
        item.coordinates.lng,
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
}

seed().catch((err) => {
  console.error("❌ Gagal seed data:", err);
  process.exit(1);
});
