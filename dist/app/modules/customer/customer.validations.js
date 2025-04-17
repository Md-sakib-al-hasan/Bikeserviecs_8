"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerSchemavalidation = void 0;
const zod_1 = require("zod");
const userSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, "Name is required"),
        email: zod_1.z.string().email("Invalid email address"),
        phone: zod_1.z.string().min(10, "Phone number is required"),
    })
});
const userUpaeSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, "Name is required").optional(),
        email: zod_1.z.string().email("Invalid email address").optional(),
        phone: zod_1.z.string().min(10, "Phone number is required").optional(),
    }).strict(),
});
exports.CustomerSchemavalidation = {
    userSchema,
    userUpaeSchema,
};
