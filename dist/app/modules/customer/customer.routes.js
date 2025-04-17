"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerRouter = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const customer_validations_1 = require("./customer.validations");
const customer_controller_1 = require("./customer.controller");
const router = (0, express_1.Router)();
router.post('/', (0, validateRequest_1.default)(customer_validations_1.CustomerSchemavalidation.userSchema), customer_controller_1.CustomerController.createCustomer);
router.get('/', customer_controller_1.CustomerController.getAllCustomers);
router.get('/:id', customer_controller_1.CustomerController.getCustomerById);
router.put('/:id', customer_controller_1.CustomerController.updateCustomerById);
router.delete('/:id', customer_controller_1.CustomerController.deleteCustomerById);
exports.CustomerRouter = router;
