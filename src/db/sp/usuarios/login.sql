USE GestionExpedientes;
GO
IF OBJECT_ID('dbo.sp_Usuarios_Login') IS NOT NULL DROP PROC dbo.sp_Usuarios_Login;
GO
CREATE PROC dbo.sp_Usuarios_Login
  @p_email NVARCHAR(150)
AS
BEGIN
  SET NOCOUNT ON;
  SELECT TOP 1 id, nombre, email, rol, password_hash, activo
  FROM dbo.Usuarios
  WHERE email = @p_email;
END
GO
