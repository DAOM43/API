export interface Expediente {
  id: number;
  codigo: string;
  descripcion: string;
  estado: "pendiente" | "aprobado" | "rechazado";
  tecnico_id: number;
  aprobador_id?: number | null;
  activo: boolean;
}