import { Request, Response } from "express";
import { db } from "../config/db";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export const getAllUMKM = async (req: Request, res: Response) => {
  try {
    const [rows] = await db.query<RowDataPacket[]>(
      "SELECT * FROM umkm ORDER BY createdAt DESC"
    );

    const data = rows.map((r: any) => ({
      ...r,
      photos: r.photos ? JSON.parse(r.photos) : [],
    }));

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal mengambil data UMKM" });
  }
};

export const addUMKM = async (req: Request, res: Response) => {
  try {
    const {
      name,
      category,
      description,
      address,
      coordinates,
      locationLink,
      photos,
      phone,
      whatsapp,
      status,
      maps_link,
    } = req.body;

    if (!name || !category || !description || !address || !coordinates) {
      return res.status(400).json({ message: "Data UMKM tidak lengkap" });
    }

    const [existing] = await db.query<RowDataPacket[]>(
      "SELECT id FROM umkm WHERE name = ? AND address = ?",
      [name, address]
    );
    if (existing.length > 0) {
      return res
        .status(400)
        .json({ message: "UMKM dengan nama dan alamat ini sudah terdaftar" });
    }

    const mapsLink =
      maps_link ||
      `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}`;

    const createdAt = new Date().toISOString().slice(0, 19).replace("T", " ");

    const [result] = await db.query<ResultSetHeader>(
      `INSERT INTO umkm
       (name, category, description, address, latitude, longitude, maps_link, photos, phone, whatsapp, createdAt, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        category,
        description,
        address,
        coordinates.lat,
        coordinates.lng,
        mapsLink,
        JSON.stringify(photos || []),
        phone || null,
        whatsapp || null,
        createdAt,
        status || "pending",
      ]
    );

    const insertedId = result.insertId;
    const [rows] = await db.query<RowDataPacket[]>(
      "SELECT * FROM umkm WHERE id = ?",
      [insertedId]
    );

    const insertedUMKM = {
      ...rows[0],
      photos: rows[0].photos ? JSON.parse(rows[0].photos) : [],
    };

    res.status(201).json(insertedUMKM);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      message:
        err.code === "ER_DUP_ENTRY"
          ? "Data UMKM sudah ada di database"
          : "Gagal menambahkan UMKM",
    });
  }
};

export const deleteUMKM = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM umkm WHERE id = ?", [id]);
    res.json({ message: "UMKM berhasil dihapus" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal menghapus UMKM" });
  }
};

export const approveUMKM = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await db.query("UPDATE umkm SET status = 'approved' WHERE id = ?", [id]);

    const [rows] = await db.query<RowDataPacket[]>(
      "SELECT * FROM umkm WHERE id = ?",
      [id]
    );
    res.json({
      ...rows[0],
      photos: rows[0].photos ? JSON.parse(rows[0].photos) : [],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal approve UMKM" });
  }
};

export const rejectUMKM = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await db.query("UPDATE umkm SET status = 'rejected' WHERE id = ?", [id]);

    const [rows] = await db.query<RowDataPacket[]>(
      "SELECT * FROM umkm WHERE id = ?",
      [id]
    );
    res.json({
      ...rows[0],
      photos: rows[0].photos ? JSON.parse(rows[0].photos) : [],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal reject UMKM" });
  }
};
