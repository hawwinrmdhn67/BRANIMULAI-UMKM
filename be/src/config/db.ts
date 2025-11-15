import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: "l8u6ih.h.filess.io",
  user: "branimulai_db_maybeeast",       
  password: "56c8c600dbfc34f99b94f2c7096242b4e89ff537",       
  database: "branimulai_db_maybeeast",
  waitForConnections: true,
  connectionLimit: 10,
  port: 3305,
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
