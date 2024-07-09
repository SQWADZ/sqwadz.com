/*
  Warnings:

  - You are about to drop the column `game` on the `Room` table. All the data in the column will be lost.
  - Added the required column `gamePath` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Room_game_idx` ON `Room`;

-- AlterTable
ALTER TABLE `Room` DROP COLUMN `game`,
    ADD COLUMN `gamePath` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Game` (
    `path` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `color` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Game_path_key`(`path`),
    PRIMARY KEY (`path`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Room` ADD CONSTRAINT `Room_gamePath_fkey` FOREIGN KEY (`gamePath`) REFERENCES `Game`(`path`) ON DELETE CASCADE ON UPDATE CASCADE;
