USE GestionExpedientes;
GO
IF OBJECT_ID('dbo.sp_Expedientes_Listar') IS NOT NULL DROP PROC dbo.sp_Expedientes_Listar;
GO
CREATE PROC dbo.sp_Expedientes_Listar
  @p_search NVARCHAR(100) = NULL,
  @p_page INT = 1,
  @p_size INT = 10
AS
BEGIN
  SET NOCOUNT ON;
  WITH Q AS (
    SELECT *, ROW_NUMBER() OVER(ORDER BY id DESC) AS rn
    FROM dbo.Expedientes
    WHERE activo = 1
      AND (@p_search IS NULL OR descripcion LIKE '%'+@p_search+'%' OR codigo LIKE '%'+@p_search+'%')
  )
  SELECT * FROM Q
  WHERE rn BETWEEN ((@p_page-1)*@p_size + 1) AND (@p_page*@p_size);
END
GO
