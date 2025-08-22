USE GestionExpedientes;
GO
IF OBJECT_ID('dbo.sp_Expedientes_CambiarEstado') IS NOT NULL DROP PROC dbo.sp_Expedientes_CambiarEstado;
GO
CREATE PROC dbo.sp_Expedientes_CambiarEstado
  @p_id INT,
  @p_estado NVARCHAR(20), -- aprobado|rechazado
  @p_justificacion NVARCHAR(500) = NULL,
  @p_aprobador_id INT
AS
BEGIN
  SET NOCOUNT ON;
  UPDATE dbo.Expedientes
    SET estado = @p_estado,
        justificacion = @p_justificacion,
        aprobador_id = @p_aprobador_id,
        fecha_estado = GETDATE(),
        updated_at = GETDATE()
  WHERE id = @p_id;
END
GO
