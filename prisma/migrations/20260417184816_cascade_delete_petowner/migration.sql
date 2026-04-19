-- DropForeignKey
ALTER TABLE "PetOwner" DROP CONSTRAINT "PetOwner_petId_fkey";

-- DropForeignKey
ALTER TABLE "PetOwner" DROP CONSTRAINT "PetOwner_userId_fkey";

-- AddForeignKey
ALTER TABLE "PetOwner" ADD CONSTRAINT "PetOwner_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetOwner" ADD CONSTRAINT "PetOwner_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
