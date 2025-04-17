import { z } from "zod"


const userSchema = z.object({
  body:z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number is required"),
  }) 
})


const userUpaeSchema = z.object({
    body:z.object({
      name: z.string().min(1, "Name is required").optional(),
      email: z.string().email("Invalid email address").optional(),
      phone: z.string().min(10, "Phone number is required").optional(),
    }).strict(), 
  })

export const CustomerSchemavalidation = {
   userSchema,
   userUpaeSchema,

}