USE GestionExpedientes;
GO
IF OBJECT_ID('dbo.sp_Expedientes_Actualizar') IS NOT NULL DROP PROC dbo.sp_Expedientes_Actualizar;
GO
CREATE PROC dbo.sp_Expedientes_Actualizar
  @p_id INT,
  @p_descripcion NVARCHAR(500)
AS
BEGIN
  SET NOCOUNT ON;
  UPDATE dbo.Expedientes
    SET descripcion = @p_descripcion,
        updated_at = GETDATE()
  WHERE id = @p_id;
END
GO
