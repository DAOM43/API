import { Request, Response, NextFunction } from 'express';

export function requireRole(...roles: Array<'tecnico' | 'coordinador'>) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.rol)) {
      return res.status(403).json({ message: 'No autorizado' });
    }
    next();
  };
}
