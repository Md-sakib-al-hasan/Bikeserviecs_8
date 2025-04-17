import { z } from "zod"

const bikeSchema = z.object({
    body: z.object({
        brand: z.string().min(1).max(50),
        model: z.string().min(1).max(50),
        year: z.number(),
        customerId: z.string().uuid(),

    })

})
 

export const BikeValidations = {
    bikeSchema
}