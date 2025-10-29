import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: "localhost",
  user: "root",       
  password: "",       
  database: "branimulai_db",
  waitForConnections: true,
  connectionLimit: 10,
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
