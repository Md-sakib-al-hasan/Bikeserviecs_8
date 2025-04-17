"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceRecordValidation = void 0;
const zod_1 = require("zod");
const serviceSchema = zod_1.z.object({
    body: zod_1.z.object({
        bikeId: zod_1.z.string().uuid(),
        serviceDate: zod_1.z.string().transform((str) => new Date(str)),
        description: zod_1.z.string().min(1),
        status: zod_1.z.enum(["in-progress", "done", "pending"]),
    })
});
exports.serviceRecordValidation = {
    serviceSchema,
};
