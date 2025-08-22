USE GestionExpedientes;
GO
IF OBJECT_ID('dbo.sp_Indicios_ListarPorExpediente') IS NOT NULL DROP PROC dbo.sp_Indicios_ListarPorExpediente;
GO
CREATE PROC dbo.sp_Indicios_ListarPorExpediente
  @p_expediente_id INT
AS
BEGIN
  SET NOCOUNT ON;
  SELECT * FROM dbo.Indicios WHERE expediente_id = @p_expediente_id AND activo = 1 ORDER BY id DESC;
END
GO
