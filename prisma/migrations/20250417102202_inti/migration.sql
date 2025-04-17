-- CreateEnum
CREATE TYPE "Status" AS ENUM ('pending', 'done', 'in-progress');

-- CreateTable
CREATE TABLE "Customers" (
    "customerId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Customers_pkey" PRIMARY KEY ("customerId")
);

-- CreateTable
CREATE TABLE "Bikes" (
    "bikeId" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "customerId" TEXT NOT NULL,

    CONSTRAINT "Bikes_pkey" PRIMARY KEY ("bikeId")
);

-- CreateTable
CREATE TABLE "Services" (
    "serviceId" TEXT NOT NULL,
    "bikeId" TEXT NOT NULL,
    "serviceDate" TIMESTAMP(3) NOT NULL,
    "completionDate" TIMESTAMP(3),
    "status" "Status" NOT NULL DEFAULT 'pending',
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Services_pkey" PRIMARY KEY ("serviceId")
);

-- AddForeignKey
ALTER TABLE "Bikes" ADD CONSTRAINT "Bikes_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customers"("customerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Services" ADD CONSTRAINT "Services_bikeId_fkey" FOREIGN KEY ("bikeId") REFERENCES "Bikes"("bikeId") ON DELETE RESTRICT ON UPDATE CASCADE;
