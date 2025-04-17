import httpStatus from "http-status"
import catchAsync from "../../utils/catchAsync";
import { Request, Response } from "express";
import { BikeService } from "./bike.service";
import sendResponse from "../../utils/sendResponse";

export const createBike = catchAsync(async (req: Request, res: Response) => {
    const result = await BikeService.createBikeDB(req.body);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Bike added successfully',
      data: result,
    });
  });
  
  // Get all Bikes
  export const getAllBikes = catchAsync(async (req: Request, res: Response) => {
    const result = await BikeService.getAllBikeDB();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All bikes fetched successfully',
      data: result,
    });
  });
  
  // Get a Bike by ID
  export const getBikeById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await BikeService.getBikeDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Bike fetched successfully',
      data: result,
    });
  });


  export const BikeController = {
    createBike,
    getAllBikes,
    getBikeById,
  }