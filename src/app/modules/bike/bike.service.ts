import { Bike } from "@prisma/client";
import { prisma } from "../../utils/prismaclient";

const createBikeDB = async (bike:Bike) => {
   const newBike = await prisma.bike.create({
       data:bike
   })

   return newBike;
}

const getAllBikeDB = async () => {
   const allBikes = await prisma.bike.findMany();
   return allBikes;
}

const getBikeDB = async (id:string) => {
    const bike = await prisma.bike.findUnique({
        where:{
            bikeId:id
        }
    })
    return bike;
}

export const BikeService = {
    createBikeDB,
    getAllBikeDB,
    getBikeDB
}