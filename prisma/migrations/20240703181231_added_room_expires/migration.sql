-- AlterTable
ALTER TABLE `Room` ADD COLUMN `expiresAt` DATETIME(0) NOT NULL DEFAULT (current_timestamp() + interval 1 hour);
