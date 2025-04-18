import { Customer } from "@prisma/client";
import { prisma } from "../../utils/prismaclient";
import AppError from "../../errors/appError";
import  httpStatus  from "http-status";

const createCustomerDB = async(payload:Customer) => {
    const isExistCustomer = await prisma.customer.findUnique({
        where:{
            email:payload.email
        }
    })
    if(isExistCustomer){
        throw new AppError(httpStatus.CONFLICT,"customer already exist")
    }
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
    if(!customer){
        throw new AppError(httpStatus.NOT_FOUND,"customer not found")
    }
    return customer;
}

const updateCustomerByIdDB = async(id:string, payload:Partial<Customer>) => {


     const update = await prisma.$transaction(async (prismaclient) => {

        const isExistCustomer = await prismaclient.customer.findUnique({
            where:{
                customerId:id
            }
        })
        if(!isExistCustomer){
            throw new AppError(httpStatus.NOT_FOUND,"customer not found")
        }

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
        const isExistCustomer = await prismaclient.customer.findUnique({
            where:{
                customerId:id
            }
        })
        if(!isExistCustomer){
            throw new AppError(httpStatus.NOT_FOUND,"customer not found")
        }

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