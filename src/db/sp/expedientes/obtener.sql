USE GestionExpedientes;
GO
IF OBJECT_ID('dbo.sp_Expedientes_Obtener') IS NOT NULL DROP PROC dbo.sp_Expedientes_Obtener;
GO
CREATE PROC dbo.sp_Expedientes_Obtener
  @p_id INT
AS
BEGIN
  SET NOCOUNT ON;
  SELECT * FROM dbo.Expedientes WHERE id = @p_id;
END
GO
