"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = void 0;
const http_status_1 = __importDefault(require("http-status"));
const notFound = (req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        status: http_status_1.default.NOT_FOUND,
        message: "API NOT FOUND!",
        stack: process.env.NODE_ENV === 'development' ? 'Route not matched' : undefined,
    });
};
exports.notFound = notFound;
