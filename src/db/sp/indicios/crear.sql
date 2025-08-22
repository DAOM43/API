USE GestionExpedientes;
GO
IF OBJECT_ID('dbo.sp_Indicios_Crear') IS NOT NULL DROP PROC dbo.sp_Indicios_Crear;
GO
CREATE PROC dbo.sp_Indicios_Crear
  @p_expediente_id INT,
  @p_codigo NVARCHAR(50),
  @p_descripcion NVARCHAR(500),
  @p_peso DECIMAL(10,2),
  @p_color NVARCHAR(50) = NULL,
  @p_tamano NVARCHAR(50) = NULL
AS
BEGIN
  SET NOCOUNT ON;
  INSERT INTO dbo.Indicios(expediente_id, codigo, descripcion, peso, color, tamano)
  VALUES(@p_expediente_id, @p_codigo, @p_descripcion, @p_peso, @p_color, @p_tamano);
  SELECT SCOPE_IDENTITY() AS id;
END
GO
