import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,     
  password: process.env.DB_PASSWORD,       
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  port: parseInt(process.env.DB_PORT || "3305"),
});

(async () => {
  try {
    const conn = await db.getConnection();
    console.log("✅ MySQL connected!");
    conn.release();
  } catch (err) {
    console.error("❌ Gagal koneksi ke MySQL:", err);
    process.exit(1);
  }
})();
