/*
  Warnings:

  - Added the required column `updatedAt` to the `Rating` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `account` DROP FOREIGN KEY `Account_userId_fkey`;

-- DropForeignKey
ALTER TABLE `parkinghistory` DROP FOREIGN KEY `ParkingHistory_parkinglot_id_fkey`;

-- DropForeignKey
ALTER TABLE `parkinghistory` DROP FOREIGN KEY `ParkingHistory_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `profile` DROP FOREIGN KEY `Profile_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `rating` DROP FOREIGN KEY `Rating_parkinglot_id_fkey`;

-- DropForeignKey
ALTER TABLE `rating` DROP FOREIGN KEY `Rating_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `ratingpictures` DROP FOREIGN KEY `RatingPictures_rating_id_fkey`;

-- DropForeignKey
ALTER TABLE `session` DROP FOREIGN KEY `Session_userId_fkey`;

-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_parkingLotId_fkey`;

-- AlterTable
ALTER TABLE `rating` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
