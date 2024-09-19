/*
  Warnings:

  - You are about to drop the column `employeees` on the `Cafes` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cafe]` on the table `Employees` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `employees` to the `Cafes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Cafes` DROP COLUMN `employeees`,
    ADD COLUMN `employees` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Employees_cafe_key` ON `Employees`(`cafe`);
