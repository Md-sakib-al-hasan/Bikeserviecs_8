"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const config_1 = __importDefault(require("../config"));
const handleZodError_1 = __importDefault(require("../errors/handleZodError"));
const appError_1 = __importDefault(require("../errors/appError"));
const http_status_1 = __importDefault(require("http-status"));
const dupliccitonerrr_1 = require("../errors/dupliccitonerrr");
const globalErrorHandler = (err, req, res, next) => {
    //setting default values
    let statusCode = 500;
    let message = 'Something went wrong!';
    if (err instanceof zod_1.ZodError) {
        const simplifiedError = (0, handleZodError_1.default)(err);
        statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
    }
    else if (err instanceof client_1.Prisma.PrismaClientValidationError) {
        statusCode = http_status_1.default.CONFLICT;
        message = err.message;
    }
    else if (err.code === 'P2003') {
        // Foreign key constraint failed
        statusCode = http_status_1.default.NOT_FOUND;
        message = "this is foreign key error first deltete the child then parent";
    }
    else if (err.code === 'P2002') {
        statusCode = http_status_1.default.CONFLICT;
        message = (0, dupliccitonerrr_1.getUniqueFieldsError)(err.message)[0];
    }
    else if (err instanceof client_1.Prisma.PrismaClientInitializationError) {
        statusCode = 500;
        message = err.message;
    }
    else if (err instanceof appError_1.default) {
        statusCode = err === null || err === void 0 ? void 0 : err.statusCode;
        message = err.message;
    }
    else if (err instanceof Error) {
        message = err.message;
    }
    // Handle the error response
    res.status(statusCode).json({
        success: false,
        status: statusCode,
        message: message || "Something went wrong!",
        stack: config_1.default.NODE_ENV === 'development' ? err === null || err === void 0 ? void 0 : err.stack : null,
    });
    return;
};
exports.default = globalErrorHandler;
