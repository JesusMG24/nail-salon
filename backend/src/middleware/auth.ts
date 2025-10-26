import { Request, Response, NextFunction, type RequestHandler } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import pool from "../db/pool";

interface User {
  id: number;
  username: string;
}

declare module "express-serve-static-core" {
  interface Request {
    user?: User;
  }
}

const JWT_SECRET = process.env.JWT_SECRET || "dev-insecure-secret";

export async function auth(req: Request, _res: Response, next: NextFunction) {
  try {
    const cookie = req.cookies?.sid;
    if (!cookie) return next();

    const payload = jwt.verify(cookie, JWT_SECRET) as JwtPayload;
    const userId = Number(payload.sub);
    const { rows } = await pool.query(
      "SELECT id, username FROM users WHERE id = $1",
      [userId]
    );

    if (rows[0]) req.user = rows[0];
  } catch (error) {
    _res.status(500).json({ error: "auth middleware error" });
  }
  next();
}

export const requireAuth: RequestHandler = (req, res, next) => {
  if (!req.user) return res.status(401).json({ error: "Unauthorized" });
  next();
};
