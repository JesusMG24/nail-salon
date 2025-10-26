import { Request, Response } from "express";
import pool from "../db/pool";
import fs from "fs";
import path from "path";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const { rows } = await pool.query(
      `SELECT id, title, content, image_url, price, duration FROM products ORDER BY price ASC`
    );

    const mapped = rows.map((r) => ({
      ...r,
      image_url:
        `${process.env.BASE_URL}${r.image_url}` || "http://localhost:3000",
      image: r.image_url,
    }));

    res.json(mapped);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const postProduct = async (req: Request, res: Response) => {
  try {
    const { title, content, price, duration } = req.body || {};
    const image_url = req.file ? `/uploads/${req.file.filename}` : null;

    const inserted = await pool.query(
      "INSERT INTO products (title, content, image_url, price, duration) VALUES ($1, $2, $3, $4, $5) RETURNING title",
      [title, content, image_url, price, duration]
    );

    res.status(201).json(inserted.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id, title, content, price, duration } = req.body || {};

    // Fetch current image_url from DB
    const { rows } = await pool.query(
      "SELECT image_url FROM products WHERE id = $1",
      [id]
    );
    const currentImageUrl = rows[0]?.image_url;

    let image_url = currentImageUrl;

    // If new image uploaded, update and delete old image
    if (req.file) {
      image_url = `/uploads/${req.file.filename}`;
      if (currentImageUrl && currentImageUrl !== image_url) {
        const filePath = path.join(process.cwd(), currentImageUrl);
        fs.unlink(filePath, () => {});
      }
    } else if (
      typeof req.body.image_url === "string" &&
      req.body.image_url === ""
    ) {
      // If image_url is an empty string, delete current image
      if (currentImageUrl) {
        const filePath = path.join(process.cwd(), currentImageUrl);
        fs.unlink(filePath, () => {});
      }
      image_url = null;
    }

    const updated = await pool.query(
      `UPDATE products
      SET title = $1, content = $2, image_url = $3, price = $4, duration = $5
      WHERE id = $6
      RETURNING title`,
      [title, content, image_url, price, duration, id]
    );

    if (updated.rowCount === 0) {
      return res.status(403).json({ error: "Product not found" });
    }

    res.status(201).json(updated.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.body || {};

    // Fetch image_url before deleting
    const { rows } = await pool.query(
      "SELECT image_url FROM products WHERE id = $1",
      [id]
    );
    const imageUrl = rows[0]?.image_url;

    // Delete product from DB
    const deleted = await pool.query("DELETE FROM products WHERE id = $1", [
      id,
    ]);

    if (deleted.rowCount === 0)
      return res.status(404).json({ error: "Product not found" });

    // Delete image file if exists
    if (imageUrl) {
      const filePath = path.join(process.cwd(), imageUrl);
      fs.unlink(filePath, (err) => {
        // Ignore error if file doesn't exist
      });
    }

    return res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
