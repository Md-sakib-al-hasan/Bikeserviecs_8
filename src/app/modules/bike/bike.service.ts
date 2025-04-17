import { Bike } from "@prisma/client";
import { prisma } from "../../utils/prismaclient";
import AppError from "../../errors/appError";
import httpStatus from "http-status";

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
    const isexitebike = await prisma.bike.findUnique({
        where:{
            bikeId:id
        }
    })
    if(!isexitebike){
        throw new AppError(httpStatus.NOT_FOUND,"Bike not found")
    }
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