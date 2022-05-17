USE [master]
GO
CREATE LOGIN [urielysantiago] WITH PASSWORD=N'urielysantiago', DEFAULT_DATABASE=[TP2_personajes], CHECK_EXPIRATION=OFF, CHECK_POLICY=OFF
GO

USE [TP2_personajes]
GO
CREATE USER [urielysantiago] FOR LOGIN [urielysantiago]
GO
USE [TP2_personajes]
GO
ALTER ROLE [db_owner] ADD MEMBER [urielysantiago]
GO