import { Customer } from "@prisma/client";
import { prisma } from "../../utils/prismaclient";

const createCustomerDB = async(payload:Customer) => {
    const newcustomer = await prisma.customer.create({
        data:payload
    })
return newcustomer;
}

const getAllCustomersDB = async() => {
    const customers = await prisma.customer.findMany()
    return customers;
}

const getCustomerByIdDB = async(id:string) => {
    const customer = await prisma.customer.findUnique({
        where:{
            customerId:id
        }
    })
    return customer;
}

const updateCustomerByIdDB = async(id:string, payload:Partial<Customer>) => {
     const update = await prisma.$transaction(async (prismaclient) => {

        await prismaclient.customer.findFirstOrThrow({
            where:{
                customerId:id
            },
        })

        const updatecustomer = await prismaclient.customer.update({
            where:{
                customerId:id
            },
            data:payload
        })
        return updatecustomer;
     })

     return update;
}

const deleteCustomerByIdDB = async(id:string) => {
    const deleteCustomer = await prisma.$transaction(async (prismaclient) => {
        await prismaclient.customer.findFirstOrThrow({
            where:{
                customerId:id
            },
        })

        const deleteCustomer = await prismaclient.customer.delete({
            where:{
                customerId:id
            },
        })

        return deleteCustomer;
    })


    return null;
}

export const CustomerService = {
    createCustomerDB,
    getAllCustomersDB,
    getCustomerByIdDB,
    updateCustomerByIdDB,
    deleteCustomerByIdDB,
}