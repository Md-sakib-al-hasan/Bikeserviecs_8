import { Service, Status } from "@prisma/client";
import { partialUtil } from "zod/lib/helpers/partialUtil";
import { prisma } from "../../utils/prismaclient";

const createServiceRecordDB= async (payload:Service) => {
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
    const service = await prisma.service.findUnique({
        where: {
            serviceId: id
        }
    })
    return service;
}

const updateServiceRecordDB= async (id:string) => {
    const update = await prisma.$transaction(async (prismaclient) => {

        await prismaclient.service.findFirstOrThrow({
            where:{
                serviceId:id
            },
        })

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