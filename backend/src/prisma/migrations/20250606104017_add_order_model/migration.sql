-- CreateEnum
CREATE TYPE "Status" AS ENUM ('long', 'short');

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "leverage" INTEGER NOT NULL,
    "marginValue" DOUBLE PRECISION NOT NULL,
    "couple" TEXT NOT NULL,
    "isOpen" BOOLEAN NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);
