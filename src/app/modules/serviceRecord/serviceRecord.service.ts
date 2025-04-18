import {  ServiceRecord, Status } from "@prisma/client";
import { prisma } from "../../utils/prismaclient";
import httpStatus from "http-status";
import AppError from "../../errors/appError";

const createServiceRecordDB= async (payload:ServiceRecord) => {
    const isbikexits = await prisma.bike.findUnique({
        where: {
            bikeId: payload.bikeId
        }
    })
     if(!isbikexits) {
        throw new AppError(httpStatus.NOT_FOUND, "Bike not found")
     }
    const service = await prisma.serviceRecord.create({
        data: payload
    })
    return service;
}

const getAllServiceRecordDB= async () => {
    const service = await prisma.serviceRecord.findMany()
    return service;
}

const getServiceRecordDB= async (id:string) => {
    
    const service = await prisma.serviceRecord.findUnique({
        where: {
            serviceId: id
        }
    })

    if(!service){
        throw new AppError(httpStatus.NOT_FOUND,"Service not found")
    }
    return service;
}

const updateServiceRecordDB= async (id:string, payload:Pick<ServiceRecord,  'completionDate'>) => {

    const update = await prisma.$transaction(async (prismaclient) => {

        const isexiteService = await prismaclient.serviceRecord.findUnique({
            where: {
                serviceId: id
            }
        })
        if(!isexiteService){
            throw new AppError(httpStatus.NOT_FOUND,"Service not found")
        }
    
        const compteDate = payload.completionDate ? new Date(payload.completionDate) : new Date();

        const updateservices = await prismaclient.serviceRecord.update({
            where:{
                serviceId:id
            },
            data:{
                completionDate: compteDate,
                status: Status.done,
            }
        })
        return updateservices;
     })

     return update;
}

const getServiceRecordwithStatus = async () => {

    const sevenDaysAgo = new Date();
     sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const service = await prisma.serviceRecord.findMany({
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