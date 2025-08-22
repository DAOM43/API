USE GestionExpedientes;
GO
IF OBJECT_ID('dbo.sp_Expedientes_Crear') IS NOT NULL DROP PROC dbo.sp_Expedientes_Crear;
GO
CREATE PROC dbo.sp_Expedientes_Crear
  @p_codigo NVARCHAR(50),
  @p_descripcion NVARCHAR(500),
  @p_tecnico_id INT
AS
BEGIN
  SET NOCOUNT ON;
  INSERT INTO dbo.Expedientes(codigo, descripcion, tecnico_id)
  VALUES(@p_codigo, @p_descripcion, @p_tecnico_id);

  SELECT SCOPE_IDENTITY() AS id;
END
GO
