"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRecordRouter = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const serviceRecord_validation_1 = require("./serviceRecord.validation");
const serviceRecord_controller_1 = require("./serviceRecord.controller");
const router = (0, express_1.Router)();
router.post('/', (0, validateRequest_1.default)(serviceRecord_validation_1.serviceRecordValidation.serviceSchema), serviceRecord_controller_1.ServiceRecordController.createServiceRecord);
router.get('/', serviceRecord_controller_1.ServiceRecordController.getAllServiceRecords);
router.get('/status', serviceRecord_controller_1.ServiceRecordController.getServiceRecordsWithStatus);
router.get('/:id', serviceRecord_controller_1.ServiceRecordController.getServiceRecordById);
router.put('/:id', (0, validateRequest_1.default)(serviceRecord_validation_1.serviceRecordValidation.updateSericeShma), serviceRecord_controller_1.ServiceRecordController.updateServiceRecordById);
exports.ServiceRecordRouter = router;
