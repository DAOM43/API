import { Request, Response, NextFunction } from "express";
import { verifyToken } from "./jwt.utils";

export function auth(req: Request, res: Response, next: NextFunction) {
  const h = req.headers.authorization;
  if (!h?.startsWith("Bearer ")) return res.status(401).json({ message: "No token" });
  try {
    const payload = verifyToken(h.slice(7));
    req.user = { id: payload.id, rol: payload.rol };
    next();
  } catch {
    res.status(401).json({ message: "Token inválido" });
  }
}
