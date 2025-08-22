export interface Indicio {
  id: number;
  expediente_id: number;
  codigo: string;
  descripcion: string;
  peso: number;
  color?: string | null;
  tamano?: string | null;
  activo: boolean;
}
