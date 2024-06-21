-- CreateTable
CREATE TABLE `tickets` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `ticketKind` ENUM('FULL', 'HALF') NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `spotId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `tickets_spotId_key`(`spotId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reservation_histories` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `ticketKind` ENUM('FULL', 'HALF') NOT NULL,
    `status` ENUM('RESERVED', 'CANCELED') NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `spotId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `reservation_histories_spotId_key`(`spotId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tickets` ADD CONSTRAINT `tickets_spotId_fkey` FOREIGN KEY (`spotId`) REFERENCES `spots`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reservation_histories` ADD CONSTRAINT `reservation_histories_spotId_fkey` FOREIGN KEY (`spotId`) REFERENCES `spots`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
