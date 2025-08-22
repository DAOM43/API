USE GestionExpedientes;
GO
IF OBJECT_ID('dbo.sp_Indicios_ActivarDesactivar') IS NOT NULL DROP PROC dbo.sp_Indicios_ActivarDesactivar;
GO
CREATE PROC dbo.sp_Indicios_ActivarDesactivar
  @p_id INT,
  @p_activo BIT
AS
BEGIN
  SET NOCOUNT ON;
  UPDATE dbo.Indicios SET activo = @p_activo WHERE id = @p_id;
END
GO
