import { Service, Status } from "@prisma/client";
import { partialUtil } from "zod/lib/helpers/partialUtil";
import { prisma } from "../../utils/prismaclient";
import httpStatus from "http-status";
import AppError from "../../errors/appError";

const createServiceRecordDB= async (payload:Service) => {
    const isbikexits = await prisma.bike.findUnique({
        where: {
            bikeId: payload.bikeId
        }
    })
     if(!isbikexits) {
        throw new AppError(httpStatus.NOT_FOUND, "Bike not found")
     }
    const service = await prisma.service.create({
        data: payload
    })
    return service;
}

const getAllServiceRecordDB= async () => {
    const service = await prisma.service.findMany()
    return service;
}

const getServiceRecordDB= async (id:string) => {
    const isexiteService = await prisma.service.findUnique({
        where: {
            serviceId: id
        }
    })
    if(!isexiteService){
        throw new AppError(httpStatus.NOT_FOUND,"Service not found")
    }

    const service = await prisma.service.findUnique({
        where: {
            serviceId: id
        }
    })
    return service;
}

const updateServiceRecordDB= async (id:string) => {

    const update = await prisma.$transaction(async (prismaclient) => {

        const isexiteService = await prismaclient.service.findUnique({
            where: {
                serviceId: id
            }
        })
        if(!isexiteService){
            throw new AppError(httpStatus.NOT_FOUND,"Service not found")
        }
    

        const updateservices = await prismaclient.service.update({
            where:{
                serviceId:id
            },
            data:{
                completionDate: new Date()
            }
        })
        return updateservices;
     })

     return update;
}

const getServiceRecordwithStatus = async () => {

    const sevenDaysAgo = new Date();
     sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const service = await prisma.service.findMany({
        where:
            {
                status:{
                    in:[Status.in_progress,Status.pending]
                },
                serviceDate: {
                    lt:sevenDaysAgo
                }
            }
        
    })


    return service;
}

export const ServiceRecordService = {
    createServiceRecordDB,
    getAllServiceRecordDB,
    getServiceRecordDB,
    updateServiceRecordDB,
    getServiceRecordwithStatus
}