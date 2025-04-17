"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BikeValidations = void 0;
const zod_1 = require("zod");
const bikeSchema = zod_1.z.object({
    body: zod_1.z.object({
        brand: zod_1.z.string().min(1).max(50),
        model: zod_1.z.string().min(1).max(50),
        year: zod_1.z.number(),
        customerId: zod_1.z.string().uuid(),
    })
});
exports.BikeValidations = {
    bikeSchema
};
