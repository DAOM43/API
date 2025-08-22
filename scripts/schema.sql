-- DB
IF DB_ID('GestionExpedientes') IS NULL
  CREATE DATABASE GestionExpedientes;
GO
USE GestionExpedientes;
GO

-- Usuarios
IF OBJECT_ID('dbo.Usuarios') IS NULL
BEGIN
  CREATE TABLE dbo.Usuarios(
    id INT IDENTITY PRIMARY KEY,
    nombre NVARCHAR(100) NOT NULL,
    email NVARCHAR(150) NOT NULL UNIQUE,
    rol NVARCHAR(20) NOT NULL CHECK (rol IN ('tecnico','coordinador')),
    password_hash NVARCHAR(200) NOT NULL,
    activo BIT NOT NULL DEFAULT 1,
    created_at DATETIME NOT NULL DEFAULT GETDATE()
  );
END
GO

-- Expedientes
IF OBJECT_ID('dbo.Expedientes') IS NULL
BEGIN
  CREATE TABLE dbo.Expedientes(
    id INT IDENTITY PRIMARY KEY,
    codigo NVARCHAR(50) NOT NULL UNIQUE,
    descripcion NVARCHAR(500) NOT NULL,
    tecnico_id INT NOT NULL FOREIGN KEY REFERENCES dbo.Usuarios(id),
    estado NVARCHAR(20) NOT NULL DEFAULT 'pendiente', -- pendiente|aprobado|rechazado
    justificacion NVARCHAR(500) NULL,
    aprobador_id INT NULL FOREIGN KEY REFERENCES dbo.Usuarios(id),
    fecha_estado DATETIME NULL,
    activo BIT NOT NULL DEFAULT 1,
    created_at DATETIME NOT NULL DEFAULT GETDATE(),
    updated_at DATETIME NOT NULL DEFAULT GETDATE()
  );
END
GO

-- Indicios
IF OBJECT_ID('dbo.Indicios') IS NULL
BEGIN
  CREATE TABLE dbo.Indicios(
    id INT IDENTITY PRIMARY KEY,
    expediente_id INT NOT NULL FOREIGN KEY REFERENCES dbo.Expedientes(id),
    codigo NVARCHAR(50) NOT NULL UNIQUE,
    descripcion NVARCHAR(500) NOT NULL,
    peso DECIMAL(10,2) NOT NULL CHECK (peso >= 0),
    color NVARCHAR(50) NULL,
    tamano NVARCHAR(50) NULL, -- sin tilde en nombre de columna
    activo BIT NOT NULL DEFAULT 1,
    created_at DATETIME NOT NULL DEFAULT GETDATE(),
    updated_at DATETIME NOT NULL DEFAULT GETDATE()
  );
END
GO
