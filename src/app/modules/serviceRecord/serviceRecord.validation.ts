import { z } from "zod"

const serviceSchema = z.object({
    body:z.object({
        bikeId: z.string().uuid(),
        serviceDate: z.string().transform((str) => new Date(str)),
        description: z.string().min(1),
        status: z.enum(["in-progress", "done", "pending"]),
    })
})




export const serviceRecordValidation = {
    serviceSchema,
    
    
}