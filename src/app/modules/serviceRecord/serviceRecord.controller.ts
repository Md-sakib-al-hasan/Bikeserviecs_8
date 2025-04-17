import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { ServiceRecordService } from "./serviceRecord.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

export const createServiceRecord = catchAsync(async (req: Request, res: Response) => {
    const result = await ServiceRecordService.createServiceRecordDB(req.body);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Service record created successfully',
      data: result,
    });
  });
  
  export const getAllServiceRecords = catchAsync(async (_req: Request, res: Response) => {
    const result = await ServiceRecordService.getAllServiceRecordDB();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All service records fetched successfully',
      data: result,
    });
  });
  
  export const getServiceRecordById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ServiceRecordService.getServiceRecordDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Service record fetched successfully',
      data: result,
    });
  });
  
  export const updateServiceRecordById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ServiceRecordService.updateServiceRecordDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Service record updated successfully',
      data: result,
    });
  });
  
  export const getServiceRecordsWithStatus = catchAsync(async (_req: Request, res: Response) => {
    const result = await ServiceRecordService.getServiceRecordwithStatus();
   
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Overdue or pending services fetched successfully',
      data: result,
    });
  });

  export const ServiceRecordController = {
    createServiceRecord,
    getServiceRecordById,
    updateServiceRecordById,
    getServiceRecordsWithStatus,
    getAllServiceRecords,
  }