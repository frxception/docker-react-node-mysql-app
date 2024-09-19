-- AlterTable
ALTER TABLE `Review` ADD COLUMN `cafesId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Tag` ADD COLUMN `cafesId` INTEGER NULL;

-- CreateTable
CREATE TABLE `Cafes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `employeees` INTEGER NOT NULL,
    `logo` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Cafes_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Employees` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email_address` VARCHAR(191) NOT NULL,
    `phone_number` VARCHAR(191) NOT NULL,
    `days_worked` INTEGER NOT NULL,
    `cafe` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Employees_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
