USE GestionExpedientes;
GO
IF OBJECT_ID('dbo.sp_Indicios_Actualizar') IS NOT NULL DROP PROC dbo.sp_Indicios_Actualizar;
GO
CREATE PROC dbo.sp_Indicios_Actualizar
  @p_id INT,
  @p_descripcion NVARCHAR(500),
  @p_peso DECIMAL(10,2),
  @p_color NVARCHAR(50) = NULL,
  @p_tamano NVARCHAR(50) = NULL
AS
BEGIN
  SET NOCOUNT ON;
  UPDATE dbo.Indicios
    SET descripcion = @p_descripcion,
        peso = @p_peso,
        color = @p_color,
        tamano = @p_tamano,
        updated_at = GETDATE()
  WHERE id = @p_id;
END
GO
