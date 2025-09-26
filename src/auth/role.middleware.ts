import { Request, Response, NextFunction } from "express";
export function only(...roles: Array<"tecnico"|"coordinador">) {
  return (req: Request, res: Response, next: NextFunction) =>
    req.user && roles.includes(req.user.rol)
      ? next()
      : res.status(403).json({ message: "Acceso denegado" });
}