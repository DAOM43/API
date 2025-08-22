import jwt, { SignOptions, Secret } from 'jsonwebtoken';
import { env } from '../config/env';

export type JwtPayload = { id: number; rol: 'tecnico' | 'coordinador' };

export function signToken(payload: JwtPayload) {
  const options: SignOptions = { expiresIn: env.jwt.expiresIn };
  return jwt.sign(payload, env.jwt.secret as Secret, options);
}

export function verifyToken(token: string) {
  return jwt.verify(token, env.jwt.secret as Secret) as JwtPayload;
}