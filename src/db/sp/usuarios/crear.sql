USE GestionExpedientes;
GO
IF OBJECT_ID('dbo.sp_Usuarios_Crear') IS NOT NULL DROP PROC dbo.sp_Usuarios_Crear;
GO
CREATE PROC dbo.sp_Usuarios_Crear
  @p_nombre NVARCHAR(100),
  @p_email NVARCHAR(150),
  @p_rol NVARCHAR(20),
  @p_password_hash NVARCHAR(200)
AS
BEGIN
  SET NOCOUNT ON;
  INSERT INTO dbo.Usuarios(nombre, email, rol, password_hash)
  VALUES(@p_nombre, @p_email, @p_rol, @p_password_hash);

  SELECT SCOPE_IDENTITY() AS id;
END
GO
