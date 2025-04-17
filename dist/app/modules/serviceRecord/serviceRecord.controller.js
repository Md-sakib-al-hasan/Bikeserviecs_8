"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRecordController = exports.getServiceRecordsWithStatus = exports.updateServiceRecordById = exports.getServiceRecordById = exports.getAllServiceRecords = exports.createServiceRecord = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const serviceRecord_service_1 = require("./serviceRecord.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
exports.createServiceRecord = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield serviceRecord_service_1.ServiceRecordService.createServiceRecordDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: 'Service record created successfully',
        data: result,
    });
}));
exports.getAllServiceRecords = (0, catchAsync_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield serviceRecord_service_1.ServiceRecordService.getAllServiceRecordDB();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'All service records fetched successfully',
        data: result,
    });
}));
exports.getServiceRecordById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield serviceRecord_service_1.ServiceRecordService.getServiceRecordDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Service record fetched successfully',
        data: result,
    });
}));
exports.updateServiceRecordById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield serviceRecord_service_1.ServiceRecordService.updateServiceRecordDB(id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Service record updated successfully',
        data: result,
    });
}));
exports.getServiceRecordsWithStatus = (0, catchAsync_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield serviceRecord_service_1.ServiceRecordService.getServiceRecordwithStatus();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Overdue or pending services fetched successfully',
        data: result,
    });
}));
exports.ServiceRecordController = {
    createServiceRecord: exports.createServiceRecord,
    getServiceRecordById: exports.getServiceRecordById,
    updateServiceRecordById: exports.updateServiceRecordById,
    getServiceRecordsWithStatus: exports.getServiceRecordsWithStatus,
    getAllServiceRecords: exports.getAllServiceRecords,
};
