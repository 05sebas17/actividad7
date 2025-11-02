CREATE DATABASE  IF NOT EXISTS `tennis_store` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `tennis_store`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: tennis_store
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `carrito_items`
--

DROP TABLE IF EXISTS `carrito_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carrito_items` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `carrito_id` bigint NOT NULL,
  `producto_id` int NOT NULL,
  `cantidad` int NOT NULL DEFAULT '1',
  `agregado_en` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_ci_unique` (`carrito_id`,`producto_id`),
  KEY `fk_ci_producto` (`producto_id`),
  CONSTRAINT `fk_ci_carrito` FOREIGN KEY (`carrito_id`) REFERENCES `carritos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_ci_producto` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON DELETE RESTRICT,
  CONSTRAINT `carrito_items_chk_1` CHECK ((`cantidad` >= 1))
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carrito_items`
--

LOCK TABLES `carrito_items` WRITE;
/*!40000 ALTER TABLE `carrito_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `carrito_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carritos`
--

DROP TABLE IF EXISTS `carritos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carritos` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `creado_en` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carritos`
--

LOCK TABLES `carritos` WRITE;
/*!40000 ALTER TABLE `carritos` DISABLE KEYS */;
INSERT INTO `carritos` VALUES (1,'2025-11-01 02:58:47'),(2,'2025-11-01 13:14:53'),(3,'2025-11-01 13:14:53'),(4,'2025-11-01 13:16:03'),(5,'2025-11-01 13:16:03'),(6,'2025-11-01 13:20:04'),(7,'2025-11-01 13:20:04'),(8,'2025-11-01 16:18:36'),(9,'2025-11-01 16:27:03'),(10,'2025-11-01 16:46:28');
/*!40000 ALTER TABLE `carritos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES (3,'Basketball'),(5,'Fútbol / Turf'),(4,'Lifestyle / Casual'),(6,'Outdoor / Trail'),(1,'Running / Correr'),(2,'Training / Gym');
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `marcas`
--

DROP TABLE IF EXISTS `marcas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `marcas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marcas`
--

LOCK TABLES `marcas` WRITE;
/*!40000 ALTER TABLE `marcas` DISABLE KEYS */;
INSERT INTO `marcas` VALUES (8,'Adidas'),(6,'Asics'),(3,'Converse'),(9,'Lotto'),(1,'New Balance'),(7,'Nike'),(5,'Puma'),(2,'Reebok'),(4,'Vans'),(10,'wilson');
/*!40000 ALTER TABLE `marcas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedido_items`
--

DROP TABLE IF EXISTS `pedido_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedido_items` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `pedido_id` bigint NOT NULL,
  `producto_id` int NOT NULL,
  `nombre_producto` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `precio_unitario` decimal(10,2) NOT NULL,
  `cantidad` int NOT NULL DEFAULT '1',
  `subtotal` decimal(12,2) GENERATED ALWAYS AS ((`precio_unitario` * `cantidad`)) STORED,
  PRIMARY KEY (`id`),
  KEY `fk_pi_pedido` (`pedido_id`),
  KEY `fk_pi_producto` (`producto_id`),
  CONSTRAINT `fk_pi_pedido` FOREIGN KEY (`pedido_id`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_pi_producto` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON DELETE RESTRICT,
  CONSTRAINT `pedido_items_chk_1` CHECK ((`cantidad` >= 1))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido_items`
--

LOCK TABLES `pedido_items` WRITE;
/*!40000 ALTER TABLE `pedido_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `pedido_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedidos`
--

DROP TABLE IF EXISTS `pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedidos` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `carrito_id` bigint DEFAULT NULL,
  `total` decimal(12,2) NOT NULL,
  `estado` enum('CREADO','PAGADO','CANCELADO') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'CREADO',
  `cliente_nombre` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cliente_email` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `creado_en` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_pedido_carrito` (`carrito_id`),
  KEY `idx_pedido_estado` (`estado`),
  CONSTRAINT `fk_pedido_carrito` FOREIGN KEY (`carrito_id`) REFERENCES `carritos` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `pedidos_chk_1` CHECK ((`total` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidos`
--

LOCK TABLES `pedidos` WRITE;
/*!40000 ALTER TABLE `pedidos` DISABLE KEYS */;
INSERT INTO `pedidos` VALUES (1,1,0.00,'CREADO',NULL,NULL,'2025-11-01 16:19:57');
/*!40000 ALTER TABLE `pedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `stock` int NOT NULL DEFAULT '0',
  `categoria_id` int DEFAULT NULL,
  `marca_id` int DEFAULT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  `creado_en` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `actualizado_en` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `imagen` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_productos_nombre` (`nombre`),
  KEY `idx_productos_categoria` (`categoria_id`),
  KEY `idx_productos_marca` (`marca_id`),
  CONSTRAINT `fk_prod_categoria` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_prod_marca` FOREIGN KEY (`marca_id`) REFERENCES `marcas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `productos_chk_1` CHECK ((`precio` >= 0)),
  CONSTRAINT `productos_chk_2` CHECK ((`stock` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (15,'Nike Jordan','tennis de gama alta.',99.90,20,4,7,1,'2025-11-01 17:24:39','2025-11-01 21:28:56','/uploads/1762046936206-52846_mj_aj_sho_1_sngl.webp'),(17,'Nike Air Zoom Vapor','ligera',179.99,25,1,7,1,'2025-11-01 19:24:36','2025-11-01 20:56:04','/uploads/1762039476977-img21.webp'),(18,'Adidas Barricade','Zapatillas con estructura reforzada y excelente estabilidad lateral.',149.99,18,4,8,1,'2025-11-01 19:26:03','2025-11-01 20:55:54','/uploads/1762039639688-1762039563910-Barricade_Tokyo_Tennis_Shoes_White_FZ3935_01_standard.jpg'),(19,'Asics Court FF','Edición especial con amortiguación FlyteFoam y diseño del campeón.',199.99,12,4,6,1,'2025-11-01 19:29:26','2025-11-01 20:55:33','/uploads/1762039766512-asics-court-ff-3-scarpe-da-tennis-uomo-white-gris-blue-1041a370-101_E (1).jpg'),(20,'Wilson Rush','Calzado de alto rendimiento con suela de goma Duralast y soporte lateral.',159.90,20,4,10,1,'2025-11-01 19:30:55','2025-11-01 20:55:20','/uploads/1762039855077-Capture2_3.webp'),(21,'Lotto Mirage','Diseño italiano con malla transpirable y suela de alta tracción.',119.50,15,1,9,1,'2025-11-01 19:31:57','2025-11-01 20:54:27','/uploads/1762039917024-rs.webp'),(22,'Adidas Adizero','Tenis ultraligeros diseñados para máxima velocidad y agarre en pista dura.',159.99,20,1,8,1,'2025-11-01 19:34:22','2025-11-01 20:52:39','/uploads/1762040062409-7fi0yszb.png'),(23,'Nike Court Air','Tenis cómodos con cámara Air Max visible y malla transpirable.',139.00,25,4,7,1,'2025-11-01 19:35:36','2025-11-01 20:52:22','/uploads/1762040136460-Nike-Court-Air-Zoom-Vapor-11-Hard-Court-Tennis-Shoe---Women-s-White---Black---Summit-White-6.webp'),(24,'NikeCourt Lite','Modelo clásico renovado con amortiguación suave y suela antideslizante.',121.99,30,2,7,1,'2025-11-01 19:37:41','2025-11-01 20:52:13','/uploads/1762040261917-nike-court-lite-4-clay-price-22777475-main.webp'),(25,'Puma Smash','Tenis de cuero clásico con plantilla SoftFoam+ para uso diario y deportivo.',99.99,25,4,5,1,'2025-11-01 19:38:39','2025-11-01 20:51:55','/uploads/1762040319724-images.jpg'),(26,'Puma Velocity','Tenis con espuma Nitro para una amortiguación responsiva en pista rápida.',159.99,12,1,5,1,'2025-11-01 19:39:40','2025-11-01 20:51:39','/uploads/1762040380827-PUMA-Velocity-Nitro-3-5-900x620.jpeg'),(27,'Puma Fuse','Modelo versátil para entrenamiento con refuerzos laterales y alta estabilidad.',139.50,15,1,5,1,'2025-11-01 19:40:52','2025-11-01 20:49:43','/uploads/1762044583605-8d2463c1a5dd.webp');
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `vw_productos_listado`
--

DROP TABLE IF EXISTS `vw_productos_listado`;
/*!50001 DROP VIEW IF EXISTS `vw_productos_listado`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vw_productos_listado` AS SELECT 
 1 AS `id`,
 1 AS `nombre`,
 1 AS `descripcion`,
 1 AS `precio`,
 1 AS `stock`,
 1 AS `categoria`,
 1 AS `marca`,
 1 AS `activo`,
 1 AS `creado_en`,
 1 AS `actualizado_en`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `vw_productos_listado`
--

/*!50001 DROP VIEW IF EXISTS `vw_productos_listado`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vw_productos_listado` AS select `p`.`id` AS `id`,`p`.`nombre` AS `nombre`,`p`.`descripcion` AS `descripcion`,`p`.`precio` AS `precio`,`p`.`stock` AS `stock`,`c`.`nombre` AS `categoria`,`m`.`nombre` AS `marca`,`p`.`activo` AS `activo`,`p`.`creado_en` AS `creado_en`,`p`.`actualizado_en` AS `actualizado_en` from ((`productos` `p` left join `categorias` `c` on((`c`.`id` = `p`.`categoria_id`))) left join `marcas` `m` on((`m`.`id` = `p`.`marca_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-02  0:31:29
