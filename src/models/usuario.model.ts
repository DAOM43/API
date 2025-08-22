export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  rol: 'tecnico' | 'coordinador';
  password_hash: string;
  activo: boolean;
}
