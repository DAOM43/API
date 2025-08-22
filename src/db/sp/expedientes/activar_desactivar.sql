USE GestionExpedientes;
GO
IF OBJECT_ID('dbo.sp_Expedientes_ActivarDesactivar') IS NOT NULL DROP PROC dbo.sp_Expedientes_ActivarDesactivar;
GO
CREATE PROC dbo.sp_Expedientes_ActivarDesactivar
  @p_id INT,
  @p_activo BIT
AS
BEGIN
  SET NOCOUNT ON;
  UPDATE dbo.Expedientes SET activo = @p_activo WHERE id = @p_id;
END
GO
