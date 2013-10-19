CREATE DATABASE chat;

USE chat;

DROP TABLE IF EXISTS `Messages`;
CREATE TABLE `Messages` (
  `id` INT NULL AUTO_INCREMENT DEFAULT NULL,
  `User_ID` SMALLINT NULL DEFAULT NULL,
  `Text` VARCHAR(255) NULL DEFAULT NULL,
  `Timestamp` TIMESTAMP NULL DEFAULT NULL,
  `Room_ID` TINYINT NULL DEFAULT NULL,
  PRIMARY KEY (`id`, `User_ID`, `Room_ID`)
);

DROP TABLE IF EXISTS `Users`;
CREATE TABLE `Users` (
  `id` SMALLINT NULL AUTO_INCREMENT DEFAULT NULL,
  `Username` VARCHAR(30) NULL DEFAULT NULL,
  PRIMARY KEY (`id`, `Username`)
);

DROP TABLE IF EXISTS `Rooms`;
CREATE TABLE `Rooms` (
  `id` TINYINT NULL AUTO_INCREMENT DEFAULT NULL,
  `Roomname` VARCHAR(64) NULL DEFAULT NULL,
  PRIMARY KEY (`id`, `Roomname`)
);

ALTER TABLE `Messages` ADD FOREIGN KEY (User_ID) REFERENCES `Users` (`id`);
ALTER TABLE `Messages` ADD FOREIGN KEY (Room_ID) REFERENCES `Rooms` (`id`);