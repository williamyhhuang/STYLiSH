-- MySQL dump 10.13  Distrib 8.0.18, for macos10.14 (x86_64)
--
-- Host: localhost    Database: stylish
-- ------------------------------------------------------
-- Server version	8.0.18

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `campaign_images`
--

DROP TABLE IF EXISTS `campaign_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `campaign_images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) DEFAULT NULL,
  `campaign_images` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campaign_images`
--

LOCK TABLES `campaign_images` WRITE;
/*!40000 ALTER TABLE `campaign_images` DISABLE KEYS */;
INSERT INTO `campaign_images` VALUES (5,111,'http://localhost:3001/uploads_campaign/campaign_images-1577020800714.jpg'),(6,222,'http://localhost:3001/uploads_campaign/campaign_images-1577020810718.jpg');
/*!40000 ALTER TABLE `campaign_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `campaign_product`
--

DROP TABLE IF EXISTS `campaign_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `campaign_product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `campaign_story` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`,`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campaign_product`
--

LOCK TABLES `campaign_product` WRITE;
/*!40000 ALTER TABLE `campaign_product` DISABLE KEYS */;
INSERT INTO `campaign_product` VALUES (3,111,'it\'s an apple for sale'),(4,222,'it\'s a book for sale');
/*!40000 ALTER TABLE `campaign_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `color`
--

DROP TABLE IF EXISTS `color`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `color` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `color_code` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_color_product1_idx` (`product_id`),
  CONSTRAINT `fk_color_product1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `color`
--

LOCK TABLES `color` WRITE;
/*!40000 ALTER TABLE `color` DISABLE KEYS */;
INSERT INTO `color` VALUES (12,'111','yellow','#FFFF00'),(13,'111','red','#FF0000'),(14,'222','yellow','#FFFF00'),(15,'222','green','#008000'),(16,'333','yellow','#FFFF00'),(17,'333','green','#008000'),(18,'444','red','#FF0000'),(19,'444','green','#008000'),(20,'555','yellow','#FFFF00'),(21,'555','green','#008000'),(22,'666','yellow','#FFFF00'),(23,'666','green','#008000');
/*!40000 ALTER TABLE `color` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` varchar(255) NOT NULL,
  `images` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_images_product1_idx` (`product_id`),
  CONSTRAINT `fk_images_product1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (1,'111','http://localhost:3001/uploads/multiple-1577019321779.jpg'),(2,'111','http://localhost:3001/uploads/multiple-1577019321779.jpg'),(3,'222','http://localhost:3001/uploads/multiple-1577019510893.jpg'),(4,'222','http://localhost:3001/uploads/multiple-1577019510896.jpg'),(5,'333','http://localhost:3001/uploads/multiple-1577019543674.jpg'),(6,'333','http://localhost:3001/uploads/multiple-1577019543674.jpg'),(7,'444','http://localhost:3001/uploads/multiple-1577019578929.jpg'),(8,'444','http://localhost:3001/uploads/multiple-1577019578929.jpg'),(9,'555','http://localhost:3001/uploads/multiple-1577019955631.jpg'),(10,'555','http://localhost:3001/uploads/multiple-1577019955633.jpg'),(11,'666','http://localhost:3001/uploads/multiple-1577019984833.jpg'),(12,'666','http://localhost:3001/uploads/multiple-1577019984835.jpg');
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `main_image`
--

DROP TABLE IF EXISTS `main_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `main_image` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` varchar(255) NOT NULL,
  `main_image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_main_image_product_idx` (`product_id`),
  CONSTRAINT `fk_main_image_product` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `main_image`
--

LOCK TABLES `main_image` WRITE;
/*!40000 ALTER TABLE `main_image` DISABLE KEYS */;
INSERT INTO `main_image` VALUES (1,'111','http://localhost:3001/uploads/single-1577019321776.jpg'),(2,'222','http://localhost:3001/uploads/single-1577019510892.jpg'),(3,'333','http://localhost:3001/uploads/single-1577019543671.jpg'),(4,'444','http://localhost:3001/uploads/single-1577019578928.jpg'),(5,'555','http://localhost:3001/uploads/single-1577019955629.jpg'),(6,'666','http://localhost:3001/uploads/single-1577019984831.jpg');
/*!40000 ALTER TABLE `main_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_list`
--

DROP TABLE IF EXISTS `order_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_user_list_order_id` int(11) NOT NULL,
  `product_id` varchar(45) DEFAULT NULL,
  `color` varchar(45) DEFAULT NULL,
  `size` varchar(45) DEFAULT NULL,
  `qty` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_order_list_order_user_list1_idx` (`order_user_list_order_id`),
  CONSTRAINT `fk_order_list_order_user_list1` FOREIGN KEY (`order_user_list_order_id`) REFERENCES `order_user_list` (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_list`
--

LOCK TABLES `order_list` WRITE;
/*!40000 ALTER TABLE `order_list` DISABLE KEYS */;
INSERT INTO `order_list` VALUES (1,137,'111','#FFFF00','S','1');
/*!40000 ALTER TABLE `order_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_user_list`
--

DROP TABLE IF EXISTS `order_user_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_user_list` (
  `order_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  `time` varchar(45) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=138 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_user_list`
--

LOCK TABLES `order_user_list` WRITE;
/*!40000 ALTER TABLE `order_user_list` DISABLE KEYS */;
INSERT INTO `order_user_list` VALUES (137,'add','add','add','add','afternoon','paid');
/*!40000 ALTER TABLE `order_user_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pay_list`
--

DROP TABLE IF EXISTS `pay_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pay_list` (
  `order_id` int(11) NOT NULL,
  `acquirer` varchar(45) DEFAULT NULL,
  `rec_trade_id` varchar(45) DEFAULT NULL,
  `bank_transaction_id` varchar(45) DEFAULT NULL,
  `card_identifier` varchar(45) DEFAULT NULL,
  `merchant_id` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pay_list`
--

LOCK TABLES `pay_list` WRITE;
/*!40000 ALTER TABLE `pay_list` DISABLE KEYS */;
INSERT INTO `pay_list` VALUES (137,'TW_CTBC','D20191222LOm4oA','TP20191222LOm4oA','dee921560b074be7a860a6b44a80c21b','AppWorksSchool_CTBC');
/*!40000 ALTER TABLE `pay_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` varchar(255) NOT NULL,
  `title` varchar(45) DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  `price` int(255) DEFAULT NULL,
  `texture` varchar(45) DEFAULT NULL,
  `wash` varchar(45) DEFAULT NULL,
  `place` varchar(45) DEFAULT NULL,
  `note` varchar(45) DEFAULT NULL,
  `catagory` varchar(45) DEFAULT NULL,
  `story` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES ('111','洋裝','洋裝',111,'cotton','yes','taiwan','no','女裝','洋裝'),('222','襯衫','襯衫',222,'cotton','yes','taiwan','no','女裝','襯衫'),('333','套裝','套裝',333,'cotton','yes','taiwan','no','女裝','套裝'),('444','外套','外套',444,'cotton','yes','taiwan','no','女裝','外套'),('555','襯衫','襯衫',555,'cotton','yes','taiwan','no','配件','襯衫'),('666','外套','外套',666,'cotton','yes','taiwan','no','配件','外套');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `signup`
--

DROP TABLE IF EXISTS `signup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `signup` (
  `id` varchar(255) NOT NULL,
  `access_token` varchar(45) DEFAULT NULL,
  `access_expired` varchar(45) DEFAULT NULL,
  `provider` varchar(45) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `picture` varchar(45) DEFAULT NULL,
  `delayTime` varchar(255) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `signup`
--

LOCK TABLES `signup` WRITE;
/*!40000 ALTER TABLE `signup` DISABLE KEYS */;
INSERT INTO `signup` VALUES ('29049','85c6cb3dec4af6b62a6b032499dffe2cf9f281d0','3600000','native','test','test@test.com',NULL,'1577026025609','test');
/*!40000 ALTER TABLE `signup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `total_price_list`
--

DROP TABLE IF EXISTS `total_price_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `total_price_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_user_list_order_id` int(11) NOT NULL,
  `subtotal` int(11) DEFAULT NULL,
  `freight` int(11) DEFAULT NULL,
  `total` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_total_price_list_order_user_list1_idx` (`order_user_list_order_id`),
  CONSTRAINT `fk_total_price_list_order_user_list1` FOREIGN KEY (`order_user_list_order_id`) REFERENCES `order_user_list` (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `total_price_list`
--

LOCK TABLES `total_price_list` WRITE;
/*!40000 ALTER TABLE `total_price_list` DISABLE KEYS */;
INSERT INTO `total_price_list` VALUES (1,137,111,60,171);
/*!40000 ALTER TABLE `total_price_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `variant`
--

DROP TABLE IF EXISTS `variant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `variant` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` varchar(255) NOT NULL,
  `color_code` varchar(255) DEFAULT NULL,
  `size` varchar(45) DEFAULT NULL,
  `stock` int(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_variant_product1_idx` (`product_id`),
  CONSTRAINT `fk_variant_product1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `variant`
--

LOCK TABLES `variant` WRITE;
/*!40000 ALTER TABLE `variant` DISABLE KEYS */;
INSERT INTO `variant` VALUES (1,'111','#FFFF00','S',998),(2,'111','#FF0000','M',999),(3,'222','#FFFF00','M',999),(4,'222','#008000','L',999),(5,'333','#FFFF00','M',999),(6,'333','#008000','L',999),(7,'444','#FF0000','S',999),(8,'444','#008000','L',999),(9,'555','#FFFF00','S',999),(10,'555','#008000','M',999),(11,'666','#FFFF00','S',999),(12,'666','#008000','M',999);
/*!40000 ALTER TABLE `variant` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-12-22 22:42:31
