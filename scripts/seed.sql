USE GestionExpedientes;
GO
-- Crea técnico
IF NOT EXISTS(SELECT 1 FROM dbo.Usuarios WHERE email='tecnico@demo.com')
INSERT INTO dbo.Usuarios(nombre, email, rol, password_hash)
VALUES ('Tecnico Demo','tecnico@demo.com','tecnico','$2b$10$nylo9ymBGMJ0z92Fj1p9jes45YVZYoEUtWBZcukMm6gm.g9gEgw2
');

-- Crea coordinador
IF NOT EXISTS(SELECT 1 FROM dbo.Usuarios WHERE email='coordinador@demo.com')
INSERT INTO dbo.Usuarios(nombre, email, rol, password_hash)
VALUES ('Coordinador Demo','coordinador@demo.com','coordinador','$2b$10$nylo9ymBGMJ0z92Fj1p9jes45YVZYoEUtWBZcukMm6gm.g9gEgw2
');
GO