import { Bike } from "@prisma/client";
import { prisma } from "../../utils/prismaclient";
import AppError from "../../errors/appError";
import httpStatus from "http-status";

const createBikeDB = async (bike:Bike) => {
   const isExiteCustomer = await prisma.customer.findUnique({
       where:{
           customerId:bike.customerId
       }
   })
   if(!isExiteCustomer){
       throw new AppError(httpStatus.NOT_FOUND,"Customer not found")
   }
   
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
    if(!bike){
        throw new AppError(httpStatus.NOT_FOUND,"Bike not found")
    }
    return bike;
}

export const BikeService = {
    createBikeDB,
    getAllBikeDB,
    getBikeDB
}