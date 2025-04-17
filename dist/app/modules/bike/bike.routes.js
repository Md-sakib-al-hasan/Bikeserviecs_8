"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BikeRouter = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const bike_validations_1 = require("./bike.validations");
const bike_controller_1 = require("./bike.controller");
const router = (0, express_1.Router)();
router.post('/', (0, validateRequest_1.default)(bike_validations_1.BikeValidations.bikeSchema), bike_controller_1.BikeController.createBike);
router.get('/', bike_controller_1.BikeController.getAllBikes);
router.get('/:id', bike_controller_1.BikeController.getBikeById);
exports.BikeRouter = router;
