import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { CustomerService } from "./customer.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status" 


// Create Customer
export const createCustomer = catchAsync(async (req: Request, res: Response) => {
  const result = await CustomerService.createCustomerDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Customer created successfully',
    data: result,
  });
});

// Get All Customers
export const getAllCustomers = catchAsync(async (req: Request, res: Response) => {
  const result = await CustomerService.getAllCustomersDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All customers fetched successfully',
    data: result,
  });
});

// Get Customer By ID
export const getCustomerById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CustomerService.getCustomerByIdDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Customer fetched successfully',
    data: result,
  });
});

// Update Customer By ID
export const updateCustomerById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CustomerService.updateCustomerByIdDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Customer updated successfully',
    data: result,
  });
});

// Delete Customer By ID
export const deleteCustomerById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CustomerService.deleteCustomerByIdDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Customer deleted successfully',
  });
});

export const CustomerController = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomerById,
  deleteCustomerById,
}
